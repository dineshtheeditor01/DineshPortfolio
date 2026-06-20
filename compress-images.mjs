import sharp from "sharp";
import { readdir, mkdir, copyFile, rename, unlink } from "fs/promises";
import { existsSync } from "fs";
import { join, extname, basename, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = join(__dirname, "public", "images");

const QUALITY = {
  webp: 80,
  jpeg: 82,
};

// Max width — images wider than this are resized proportionally
const MAX_WIDTH = 1800;

async function getAllImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getAllImages(full)));
    } else if (/\.(jpe?g|png|webp)$/i.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

async function compress(filePath) {
  const ext = extname(filePath).toLowerCase();
  const origName = basename(filePath);
  const dir = dirname(filePath);

  // Save original
  const backupDir = join(dir, "_originals");
  if (!existsSync(backupDir)) await mkdir(backupDir, { recursive: true });
  const backupPath = join(backupDir, origName);
  if (!existsSync(backupPath)) await copyFile(filePath, backupPath);

  const beforeStat = (await import("fs")).statSync(filePath);
  const beforeKB = Math.round(beforeStat.size / 1024);

  let img = sharp(filePath);
  const meta = await img.metadata();

  // Resize if too wide
  if (meta.width && meta.width > MAX_WIDTH) {
    img = img.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  // Always output webp — smallest for photos and graphics alike
  const outPath = filePath.replace(/\.(jpe?g|png|webp)$/i, ".webp");

  await img.webp({ quality: QUALITY.webp }).toFile(outPath + ".tmp");

  // If we created a new file (different name), delete old and rename
  if (outPath !== filePath) {
    await unlink(filePath);
  }
  await rename(outPath + ".tmp", outPath);

  const afterStat = (await import("fs")).statSync(outPath);
  const afterKB = Math.round(afterStat.size / 1024);
  const saved = Math.round((1 - afterStat.size / beforeStat.size) * 100);

  const label =
    outPath !== filePath
      ? `${origName} → ${basename(outPath)}`
      : basename(outPath);
  console.log(`  ${label}  ${beforeKB}KB → ${afterKB}KB  (${saved}% smaller)`);
}

async function main() {
  console.log("🖼  Compressing images in public/images ...\n");
  const files = await getAllImages(IMAGES_DIR);

  // Skip files already inside _originals backup folders
  const targets = files.filter((f) => !f.includes("_originals"));

  if (targets.length === 0) {
    console.log("No images found.");
    return;
  }

  for (const f of targets) {
    try {
      await compress(f);
    } catch (err) {
      console.error(`  ERROR: ${basename(f)} — ${err.message}`);
    }
  }

  console.log("\n✅ Done! Originals saved in public/images/_originals/");
  console.log("\n⚠️  ACTION REQUIRED — update these src paths in your JSX:");
  console.log("   .jpeg / .jpg / .png  →  .webp");
  console.log("   Example: /images/Hero.jpeg  →  /images/Hero.webp");
  console.log("   Also update the <link rel=preload> in index.html\n");
}

main().catch(console.error);
