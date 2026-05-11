import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Resvg } from '@resvg/resvg-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const asciiF = [
  "███████╗",
  "██╔════╝",
  "█████╗  ",
  "██╔══╝  ",
  "██║     ",
  "╚═╝     "
];

let shapes = "";
const startX = 26;
const startY = 14;

for (let r = 0; r < 6; r++) {
  for (let c = 0; c < 8; c++) {
    const char = asciiF[r][c];
    if (!char || char === ' ') continue;
    const x = startX + c * 6.0;
    const y = startY + r * 12.0;

    let paths = "";
    if (char === '█') {
      paths = `<rect x="${x}" y="${y}" width="6.5" height="12.5" fill="#000" />`;
    } else if (char === '╗') {
      paths = `<path d="M ${x},${y+4.56} H ${x+4.44} V ${y+12.5} H ${x+3.48} V ${y+5.52} H ${x} Z" fill="#000" />
               <path d="M ${x},${y+6.48} H ${x+2.52} V ${y+12.5} H ${x+1.56} V ${y+7.44} H ${x} Z" fill="#000" />`;
    } else if (char === '╔') {
      paths = `<path d="M ${x+1.56},${y+4.56} H ${x+6.5} V ${y+5.52} H ${x+2.52} V ${y+12.5} H ${x+1.56} Z" fill="#000" />
               <path d="M ${x+3.48},${y+6.48} H ${x+6.5} V ${y+7.44} H ${x+4.44} V ${y+12.5} H ${x+3.48} Z" fill="#000" />`;
    } else if (char === '╝') {
      paths = `<path d="M ${x},${y+7.44} H ${x+4.44} V ${y} H ${x+3.48} V ${y+6.48} H ${x} Z" fill="#000" />
               <path d="M ${x},${y+5.52} H ${x+2.52} V ${y} H ${x+1.56} V ${y+4.56} H ${x} Z" fill="#000" />`;
    } else if (char === '╚') {
      paths = `<path d="M ${x+1.56},${y} V ${y+7.44} H ${x+6.5} V ${y+6.48} H ${x+2.52} V ${y} Z" fill="#000" />
               <path d="M ${x+3.48},${y} V ${y+5.52} H ${x+6.5} V ${y+4.56} H ${x+4.44} V ${y} Z" fill="#000" />`;
    } else if (char === '═') {
      paths = `<rect x="${x}" y="${y+4.56}" width="6.5" height="0.96" fill="#000" />
               <rect x="${x}" y="${y+6.48}" width="6.5" height="0.96" fill="#000" />`;
    } else if (char === '║') {
      paths = `<rect x="${x+1.56}" y="${y}" width="0.96" height="12.5" fill="#000" />
               <rect x="${x+3.48}" y="${y}" width="0.96" height="12.5" fill="#000" />`;
    }
    shapes += paths + '\n';
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect x="0" y="0" width="100" height="100" fill="#ffffff" />
  <g transform="translate(0, 2.3)">
    ${shapes}
  </g>
</svg>`;

const sizes = [16, 32, 180, 192, 512]; // 180 is for apple-touch-icon
const publicDir = join(__dirname, '../public');

// Ensure public dir exists
try { mkdirSync(publicDir, { recursive: true }); } catch (e) {}

// Write SVG
writeFileSync(join(publicDir, 'favicon.svg'), svg);

for (const size of sizes) {
  const resvg = new Resvg(svg, {
    background: '#ffffff',
    fitTo: {
      mode: 'width',
      value: size,
    },
  });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  
  if (size === 180) {
    writeFileSync(join(publicDir, 'apple-touch-icon.png'), pngBuffer);
  } else {
    writeFileSync(join(publicDir, `favicon-${size}x${size}.png`), pngBuffer);
  }
}

console.log("Successfully generated favicons for client-focusequalsfreedom");
