// Crops a region of a PNG and nearest-neighbor upscales it, so mockup details
// (logo shapes, icon glyphs, spacing) can be inspected closely.
// Usage: node scripts/png-crop.mjs in.png out.png x y w h [scale]
import { readFileSync, writeFileSync } from "node:fs";
import { inflateSync, deflateSync } from "node:zlib";

function decodePng(path) {
  const buf = readFileSync(path);
  let offset = 8;
  let width = 0;
  let height = 0;
  let colorType = 0;
  const idat = [];
  while (offset < buf.length) {
    const length = buf.readUInt32BE(offset);
    const type = buf.toString("ascii", offset + 4, offset + 8);
    const data = buf.subarray(offset + 8, offset + 8 + length);
    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      colorType = data[9];
    } else if (type === "IDAT") idat.push(data);
    else if (type === "IEND") break;
    offset += 12 + length;
  }
  const channels = colorType === 6 ? 4 : 3;
  const raw = inflateSync(Buffer.concat(idat));
  const stride = width * channels;
  const pixels = Buffer.alloc(height * stride);
  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)];
    const line = raw.subarray(y * (stride + 1) + 1, y * (stride + 1) + 1 + stride);
    const out = pixels.subarray(y * stride, (y + 1) * stride);
    const prev = y > 0 ? pixels.subarray((y - 1) * stride, y * stride) : null;
    for (let x = 0; x < stride; x++) {
      const a = x >= channels ? out[x - channels] : 0;
      const b = prev ? prev[x] : 0;
      const c = prev && x >= channels ? prev[x - channels] : 0;
      const v = line[x];
      if (filter === 0) out[x] = v;
      else if (filter === 1) out[x] = v + a;
      else if (filter === 2) out[x] = v + b;
      else if (filter === 3) out[x] = v + ((a + b) >> 1);
      else {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        out[x] = v + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c);
      }
    }
  }
  return { width, height, channels, pixels };
}

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (const byte of buf) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function encodePng(width, height, rgb) {
  const stride = width * 3;
  const raw = Buffer.alloc(height * (stride + 1));
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0;
    rgb.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const [, , inPath, outPath, xs, ys, ws, hs, ss] = process.argv;
const img = decodePng(inPath);
const x0 = Number(xs);
const y0 = Number(ys);
const w = Math.min(Number(ws), img.width - x0);
const h = Math.min(Number(hs), img.height - y0);
const scale = Number(ss ?? 3);

const outW = w * scale;
const outH = h * scale;
const out = Buffer.alloc(outW * outH * 3);
for (let y = 0; y < outH; y++) {
  for (let x = 0; x < outW; x++) {
    const sx = x0 + Math.floor(x / scale);
    const sy = y0 + Math.floor(y / scale);
    const si = sy * img.width * img.channels + sx * img.channels;
    const di = (y * outW + x) * 3;
    out[di] = img.pixels[si];
    out[di + 1] = img.pixels[si + 1];
    out[di + 2] = img.pixels[si + 2];
  }
}
writeFileSync(outPath, encodePng(outW, outH, out));
console.log(`${outPath} ${outW}x${outH} (from ${w}x${h} at ${x0},${y0} @${scale}x)`);
