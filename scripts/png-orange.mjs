// Isolates saturated orange pixels inside a region and averages the strongest
// ones, which recovers text color where glyph edges blend into the background.
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

function orangeCore(x0, y0, x1, y1) {
  const hits = [];
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      const i = y * img.width * img.channels + x * img.channels;
      const r = img.pixels[i];
      const g = img.pixels[i + 1];
      const b = img.pixels[i + 2];
      if (r > 120 && r - b > 70 && r - g > 40 && g >= b) hits.push([r, g, b]);
    }
  }
  if (!hits.length) return { n: 0 };
  // Rank by redness and take the strongest tenth: glyph cores, not antialiased edges.
  hits.sort((p, q) => q[0] - p[0]);
  const core = hits.slice(0, Math.max(1, Math.round(hits.length * 0.1)));
  const avg = core
    .reduce((acc, p) => [acc[0] + p[0], acc[1] + p[1], acc[2] + p[2]], [0, 0, 0])
    .map((v) => Math.round(v / core.length));
  return { n: hits.length, core: hex(avg[0], avg[1], avg[2]) };
}

function whiteCore(x0, y0, x1, y1) {
  const hits = [];
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      const i = y * img.width * img.channels + x * img.channels;
      const r = img.pixels[i];
      const g = img.pixels[i + 1];
      const b = img.pixels[i + 2];
      if (r > 120 && Math.abs(r - g) < 26 && Math.abs(g - b) < 26) hits.push([r, g, b]);
    }
  }
  if (!hits.length) return { n: 0 };
  hits.sort((p, q) => q[0] + q[1] + q[2] - (p[0] + p[1] + p[2]));
  const core = hits.slice(0, Math.max(1, Math.round(hits.length * 0.15)));
  const avg = core
    .reduce((acc, p) => [acc[0] + p[0], acc[1] + p[1], acc[2] + p[2]], [0, 0, 0])
    .map((v) => Math.round(v / core.length));
  return { n: hits.length, core: hex(avg[0], avg[1], avg[2]) };
}

console.log("ORANGE ELEMENTS");
const orange = [
  ['hero "AC OUT?" headline', 22, 105, 155, 140],
  ['logo "FIRST" wordmark', 118, 14, 165, 30],
  ['eyebrow "OUR SERVICES"', 272, 403, 350, 412],
  ['"Learn More" link', 58, 564, 105, 574],
  ['emergency eyebrow "EXTREME HEAT"', 110, 774, 300, 784],
  ["hero em dash accent", 258, 155, 285, 180],
  ["footer heading FIRST", 108, 916, 150, 930],
  ["stars row", 448, 622, 505, 634],
];
for (const [label, ...box] of orange) {
  const { n, core } = orangeCore(...box);
  console.log(label.padEnd(34), n ? `${core}  (${n} px)` : "none");
}

console.log("\nWHITE / LIGHT TEXT");
const whites = [
  ['hero "WE\'RE ON IT" headline', 22, 148, 240, 190],
  ["section h2 Complete Comfort", 200, 415, 420, 435],
  ["body paragraph hero", 22, 200, 200, 245],
  ["service card title", 60, 500, 120, 510],
  ["service card body", 40, 515, 140, 545],
  ["footer body text", 36, 946, 170, 975],
  ["nav link", 184, 22, 210, 30],
  ["testimonial quote", 448, 645, 570, 700],
];
for (const [label, ...box] of whites) {
  const { n, core } = whiteCore(...box);
  console.log(label.padEnd(34), n ? `${core}  (${n} px)` : "none");
}
