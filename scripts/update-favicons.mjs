import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputImage = "C:\\Users\\delta\\.gemini\\antigravity-ide\\brain\\387630e6-123a-4363-9e93-33b09bb5eda7\\favicon_base_1779631404016.png";
const outputDir = path.resolve(__dirname, "../public");

async function generateFavicons() {
  const sizes = [16, 32, 192, 512];
  
  for (const size of sizes) {
    const outputPath = path.join(outputDir, `favicon-${size}x${size}.png`);
    await sharp(inputImage)
      .resize(size, size)
      .png()
      .toFile(outputPath);
    console.log(`Generated favicon-${size}x${size}.png`);
  }
}

generateFavicons().catch(console.error);
