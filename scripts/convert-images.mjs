import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = "C:\\Users\\delta\\.gemini\\antigravity-ide\\brain\\387630e6-123a-4363-9e93-33b09bb5eda7";
const outputDir = path.resolve(__dirname, "../public/img/landing/optimized");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function convertImages() {
  const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.png'));
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    // clean up name (e.g. hero_photo_123.png -> hero_photo.webp)
    const baseName = file.replace(/_\d+\.png$/, '');
    const outputPath = path.join(outputDir, `${baseName}.webp`);
    console.log(`Converting ${file} to ${baseName}.webp`);
    
    await sharp(inputPath)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(outputPath);
  }
  console.log('Conversion complete!');
}

convertImages().catch(console.error);
