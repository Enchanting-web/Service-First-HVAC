/**
 * Prints a per-row colour profile of a PNG so horizontal band boundaries can be
 * read off precisely. Used to compare mockup band heights against the build.
 *
 *   node scripts/png-rows.mjs assets/mockup.png
 */
import { readFileSync } from "node:fs";
import { inflateSync } from "node:zlib";

const file = process.argv[2];
if (!file) {
  console.error("usage: node scripts/png-rows.mjs <file.png>");
  process.exit(1);
}

const buf = readFileSync(file);
if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error("not a png");

let pos = 8;
let width = 0;
let height = 0;
let bitDepth = 0;
let colorType = 0;
const idat = [];

while (pos < buf.length) {
  const len = buf.readUInt32BE(pos);
  const type = buf.toString("ascii", pos + 4, pos + 8);
  const data = buf.subarray(pos + 8, pos + 8 + len);
  if (type === "IHDR") {
    width = data.readUInt32BE(0);
    height = data.readUInt32BE(4);
    bitDepth = data[8];
    colorType = data[9];
  } else if (type === "IDAT") {
    idat.push(data);
  } else if (type === "IEND") {
    break;
  }
  pos += len + 12;
}

if (bitDepth !== 8) throw new Error(`unsupported bit depth ${bitDepth}`);
const channels = { 0: 1, 2: 3, 4: 2, 6: 4 }[colorType];
if (!channels) throw new Error(`unsupported colour type ${colorType}`);

const raw = inflateSync(Buffer.concat(idat));
const stride = width * channels;
const pixels = Buffer.alloc(height * stride);

// Undo the per-scanline PNG filters.
for (let y = 0; y < height; y++) {
  const filter = raw[y * (stride + 1)];
  const line = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
  const out = pixels.subarray(y * stride, (y + 1) * stride);
  const prev = y > 0 ? pixels.subarray((y - 1) * stride, y * stride) : Buffer.alloc(stride);

  for (let x = 0; x < stride; x++) {
    const a = x >= channels ? out[x - channels] : 0;
    const b = prev[x];
    const c = x >= channels ? prev[x - channels] : 0;
    const v = line[x];
    switch (filter) {
      case 0:
        out[x] = v;
        break;
      case 1:
        out[x] = (v + a) & 0xff;
        break;
      case 2:
        out[x] = (v + b) & 0xff;
        break;
      case 3:
        out[x] = (v + ((a + b) >> 1)) & 0xff;
        break;
      case 4: {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        out[x] = (v + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c)) & 0xff;
        break;
      }
      default:
        throw new Error(`bad filter ${filter}`);
    }
  }
}

const hex = (n) => n.toString(16).padStart(2, "0");

/** Modal colour of a row, quantised so JPEG noise collapses into one bucket. */
function rowMode(y) {
  const counts = new Map();
  for (let x = 0; x < width; x++) {
    const i = y * stride + x * channels;
    const key =
      ((pixels[i] >> 3) << 10) | ((pixels[i + 1] >> 3) << 5) | (pixels[i + 2] >> 3);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  let best = 0;
  let bestKey = 0;
  for (const [key, n] of counts) {
    if (n > best) {
      best = n;
      bestKey = key;
    }
  }
  const r = ((bestKey >> 10) & 31) << 3;
  const g = ((bestKey >> 5) & 31) << 3;
  const b = (bestKey & 31) << 3;
  return { hex: `#${hex(r)}${hex(g)}${hex(b)}`, share: best / width };
}

let runStart = 0;
let runColor = rowMode(0).hex;
for (let y = 1; y <= height; y++) {
  const color = y < height ? rowMode(y).hex : null;
  if (color !== runColor) {
    if (y - runStart >= 3) {
      console.log(
        `${String(runStart).padStart(4)}–${String(y - 1).padStart(4)}  h=${String(y - runStart).padStart(4)}  ${runColor}`,
      );
    }
    runStart = y;
    runColor = color;
  }
}
