import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC = path.join(ROOT, "webapp", "public");
const MATERIALS = path.join(ROOT, "Matrealien");

async function generateOgImage() {
  const logo = await sharp(path.join(MATERIALS, "SchopControl OG logo.png"))
    .resize({ height: 400, withoutEnlargement: true })
    .toBuffer();

  const logoMeta = await sharp(logo).metadata();

  const canvas = sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4 as 4,
      background: { r: 9, g: 9, b: 11, alpha: 1 },
    },
  }).png();

  const result = await canvas
    .composite([
      {
        input: logo,
        left: Math.round((1200 - (logoMeta.width || 0)) / 2),
        top: Math.round((630 - (logoMeta.height || 0)) / 2),
      },
    ])
    .png({ compressionLevel: 9 })
    .toFile(path.join(PUBLIC, "og-image.png"));

  console.log("OG image created:", result.width, "x", result.height);
}

async function optimizeLogo() {
  await sharp(path.join(MATERIALS, "ShcopControl Logo.png"))
    .resize({ height: 200, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(path.join(PUBLIC, "placeholder-logo.png"));

  const meta = await sharp(
    path.join(PUBLIC, "placeholder-logo.png")
  ).metadata();
  console.log("Logo optimized:", meta.width, "x", meta.height);
}

generateOgImage().then(() => optimizeLogo()).then(() => console.log("Done!"));
