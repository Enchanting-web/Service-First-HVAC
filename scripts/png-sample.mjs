// Zero-dependency PNG reader used to sample brand colors out of the design mockup.
// Supports the 8-bit RGB/RGBA truecolor subset, which is what our mockup uses.
import { readFileSync } from "node:fs";
import { inflateSync } from "node:zlib";

function decodePng(path) {
  const buf = readFileSync(path);
  if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error("not a png");

  let offset = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  const idat = [];

  while (offset < buf.length) {
    const length = buf.readUInt32BE(offset);
    const type = buf.toString("ascii", offset + 4, offset + 8);
    const data = buf.subarray(offset + 8, offset + 8 + length);

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
    offset += 12 + length;
  }

  if (bitDepth !== 8 || (colorType !== 2 && colorType !== 6)) {
    throw new Error(`unsupported png: bitDepth=${bitDepth} colorType=${colorType}`);
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

      switch (filter) {
        case 0:
          out[x] = v;
          break;
        case 1:
          out[x] = v + a;
          break;
        case 2:
          out[x] = v + b;
          break;
        case 3:
          out[x] = v + ((a + b) >> 1);
          break;
        case 4: {
          const p = a + b - c;
          const pa = Math.abs(p - a);
          const pb = Math.abs(p - b);
          const pc = Math.abs(p - c);
          out[x] = v + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c);
          break;
        }
        default:
          throw new Error(`bad filter ${filter}`);
      }
    }
  }

  return { width, height, channels, pixels };
}

const hex = (r, g, b) =>
  "#" + [r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("").toUpperCase();

function pixelAt(img, x, y) {
  const i = y * img.width * img.channels + x * img.channels;
  return [img.pixels[i], img.pixels[i + 1], img.pixels[i + 2]];
}

// Brightest and average readings in a box. On a lossy screenshot the brightest
// saturated pixel is the closest thing to the designer's intended flat fill.
function analyze(img, x0, y0, x1, y1) {
  let sum = [0, 0, 0];
  let n = 0;
  let best = [0, 0, 0];
  let bestScore = -1;

  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      const px = pixelAt(img, x, y);
      sum = [sum[0] + px[0], sum[1] + px[1], sum[2] + px[2]];
      n++;
      const [r, g, b] = px;
      const score = r + g + b - 2 * Math.abs(r - g) - 2 * Math.abs(g - b);
      if (score > bestScore) {
        bestScore = score;
        best = px;
      }
    }
  }
  const avg = sum.map((v) => Math.round(v / n));
  return { avg: hex(avg[0], avg[1], avg[2]), peak: hex(best[0], best[1], best[2]) };
}

const img = decodePng(process.argv[2] ?? "assets/mockup-rgb.png");
console.log(`size ${img.width}x${img.height}\n`);

const regions = [
  ["alert bar (flat, no text)", 240, 58, 260, 72],
  ["alert bar right of icon", 330, 60, 345, 70],
  ["phone CTA button fill", 60, 262, 130, 276],
  ["schedule btn border area", 170, 258, 260, 280],
  ["subscribe button fill", 495, 864, 555, 884],
  ["orange icon circle (heating)", 222, 458, 242, 480],
  ["navy icon circle (AC)", 78, 458, 98, 480],
  ["orange icon circle (commercial)", 508, 458, 528, 480],
  ["service card fill", 40, 520, 80, 550],
  ["about testimonial card fill", 390, 640, 430, 670],
  ["page bg between sections", 300, 592, 340, 598],
  ["footer fill", 250, 950, 300, 990],
  ["hero left dark", 20, 230, 40, 250],
  ["emergency band left", 30, 790, 50, 820],
  ["stars gold", 452, 626, 500, 632],
  ["learn more orange text", 62, 568, 90, 572],
];

console.log("region".padEnd(34), "avg".padEnd(10), "peak");
for (const [label, x0, y0, x1, y1] of regions) {
  const { avg, peak } = analyze(img, x0, y0, x1, y1);
  console.log(label.padEnd(34), avg.padEnd(10), peak);
}

// Vertical slice through the whole page shows every band's background color.
console.log("\nvertical scan at x=310 (page background bands):");
let prev = null;
for (let y = 0; y < img.height; y += 2) {
  const { avg } = analyze(img, 305, y, 315, y);
  if (avg !== prev) {
    console.log(String(y).padStart(5), avg);
    prev = avg;
  }
}
