import sharp from 'sharp';
import { readdir, unlink } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const INPUT_DIR = './static'; // or wherever your images live
const SKIP_FORMATS = ['.gif', '.webp', '.avif', '.svg'];
const CONVERTIBLE = ['.png', '.jpg', '.jpeg', '.bmp', '.tiff'];

async function getImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getImages(fullPath)); // recurse into subfolders
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (CONVERTIBLE.includes(ext)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

async function convertImage(filePath) {
  const ext = path.extname(filePath);
  const withoutExt = filePath.slice(0, -ext.length);
  const webpPath = `${withoutExt}.webp`;
  const avifPath = `${withoutExt}.avif`;

  // Skip if already converted
  if (existsSync(webpPath) && existsSync(avifPath)) {
    console.log(`⏭️  Skipping (already converted): ${filePath}`);
    return;
  }

  console.log(`🔄 Converting: ${filePath}`);

  await Promise.all([
    sharp(filePath).webp({ quality: 80 }).toFile(webpPath),
    sharp(filePath).avif({ quality: 60 }).toFile(avifPath),
  ]);

  // Remove the original
  await unlink(filePath);
  console.log(`✅ Done: ${webpPath} + ${avifPath}`);
}

async function run() {
  const images = await getImages(INPUT_DIR);
  console.log(`Found ${images.length} images to convert`);

  for (const img of images) {
    await convertImage(img);
  }

  console.log('🎉 All done!');
}

run();