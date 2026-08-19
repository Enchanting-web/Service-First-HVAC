// Reports the most common pixel value in a region, which recovers the intended
// flat fill from a lossy screenshot better than averaging does.
import { readFileSync } from "node:fs";
import { inflateSync } from "node:zlib";

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

const hex = (r, g, b) =>
  "#" + [r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("").toUpperCase();

const img = decodePng(process.argv[2] ?? "assets/mockup-rgb.png");

function mode(x0, y0, x1, y1, bucket = 4) {
  const counts = new Map();
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      const i = y * img.width * img.channels + x * img.channels;
      const r = img.pixels[i];
      const g = img.pixels[i + 1];
      const b = img.pixels[i + 2];
      // Quantize slightly so JPEG noise around one fill collapses to a single bin.
      const key = [r, g, b].map((v) => Math.round(v / bucket) * bucket).join(",");
      const entry = counts.get(key) ?? { n: 0, r: 0, g: 0, b: 0 };
      entry.n++;
      entry.r += r;
      entry.g += g;
      entry.b += b;
      counts.set(key, entry);
    }
  }
  const [, top] = [...counts.entries()].sort((a, b) => b[1].n - a[1].n)[0];
  return {
    hex: hex(Math.round(top.r / top.n), Math.round(top.g / top.n), Math.round(top.b / top.n)),
    share: ((top.n / ((x1 - x0 + 1) * (y1 - y0 + 1))) * 100).toFixed(0) + "%",
  };
}

const regions = [
  ["alert bar fill (above text)", 120, 54, 580, 57],
  ["alert bar fill (below text)", 120, 75, 580, 78],
  ["phone CTA fill", 30, 258, 150, 262],
  ["subscribe btn fill", 490, 864, 562, 868],
  ["orange icon circle heating", 224, 462, 240, 478],
  ["orange icon circle commercial", 510, 462, 526, 478],
  ["navy icon circle AC", 80, 462, 96, 478],
  ["navy icon circle maintenance", 368, 462, 384, 478],
  ["service card fill", 36, 528, 140, 552],
  ["testimonial card fill", 380, 600, 580, 620],
  ["about text card region", 200, 690, 340, 700],
  ["page bg", 300, 588, 340, 596],
  ["hero photo-free left", 20, 300, 40, 306],
  ["stats strip fill", 200, 300, 240, 306],
  ["trust bar fill", 200, 360, 240, 366],
  ["footer fill", 200, 940, 400, 960],
  ["copyright strip fill", 200, 1008, 400, 1016],
  ["van image card bg", 30, 604, 180, 610],
  ["header fill", 480, 10, 500, 20],
  ["header CTA button fill", 528, 18, 596, 22],
];

console.log("region".padEnd(34), "fill".padEnd(10), "share");
for (const [label, x0, y0, x1, y1] of regions) {
  const { hex: h, share } = mode(x0, y0, x1, y1);
  console.log(label.padEnd(34), h.padEnd(10), share);
}
