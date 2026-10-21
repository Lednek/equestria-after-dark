// Development-only asset preparation. The deployed website has no dependencies.
// Run: node tools/prepare-assets.cjs <source-images-folder>
// Uses sharp; SHARP_MODULE may point at a bundled sharp installation.
const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require(process.env.SHARP_MODULE || 'sharp');

async function main() {
  const input = process.argv[2];
  if (!input) throw new Error('Pass the folder containing the four supplied PNG images.');
  const assets = path.resolve(__dirname, '../dist/assets');
  const gallery = path.join(assets, 'gallery');
  await fs.mkdir(gallery, { recursive: true });
  const images = [
    ['Aldeia Encantada à Luz da Lua (1).png', 'moonlit-village'],
    ['Vila Fantástica sob a Lua Rosa.png', 'town-exploration'],
    ['Quarto de Taverna ao Luar.png', 'tavern-interior'],
    ['Flerte à luz de velas na taverna.png', 'tavern-conversation'],
    ['Sete Encantadoras no Taverna Fantástica.png', 'character-ensemble']
  ];
  for (const [source, name] of images) {
    const original = path.join(input, source);
    await sharp(original).rotate().resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 86, effort: 6 }).toFile(path.join(gallery, `${name}.webp`));
    await sharp(original).rotate().resize({ width: 840, withoutEnlargement: true }).webp({ quality: 82, effort: 6 }).toFile(path.join(gallery, `${name}-840.webp`));
  }
  const icon = path.join(assets, 'icon.svg');
  for (const size of [32, 180, 192, 512, 1024]) {
    const name = size === 180 ? 'apple-touch-icon.png' : `icon-${size}.png`;
    await sharp(icon).resize(size, size).png().toFile(path.join(assets, name));
  }
  // Lay out a dedicated social card using the supplied banner, without retouching it.
  const background = await sharp(path.join(input, images[0][0])).resize(1200, 630, { fit: 'cover', position: 'right' }).toBuffer();
  const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <defs><linearGradient id="shade"><stop stop-color="#111114" stop-opacity=".97"/><stop offset=".42" stop-color="#111114" stop-opacity=".87"/><stop offset=".74" stop-color="#111114" stop-opacity=".05"/></linearGradient></defs>
    <rect width="1200" height="630" fill="url(#shade)"/>
    <rect x="47" y="48" width="1106" height="534" fill="none" stroke="#e0c7f4" stroke-opacity=".22"/>
    <path d="M84 151h36" stroke="#c6a6dc" stroke-width="2"/>
    <text x="84" y="190" fill="#cbb0de" font-family="Segoe UI,Arial,sans-serif" font-size="13" letter-spacing="4">AN OPEN WORLD AFTER FRIENDSHIP</text>
    <text x="79" y="289" fill="#f2ece4" font-family="Georgia,serif" font-size="83" letter-spacing="-3">Equestria</text>
    <text x="78" y="384" fill="#ceb1e2" font-family="Georgia,serif" font-style="italic" font-size="94" letter-spacing="-4">After Dark.</text>
    <text x="84" y="433" fill="#e0d4e6" font-family="Segoe UI,Arial,sans-serif" font-size="19">A familiar world. A darker chapter.</text>
    <text x="84" y="535" fill="#bdb0c6" font-family="Segoe UI,Arial,sans-serif" font-size="12" letter-spacing="2">18+ · INDEPENDENT FAN PROJECT · IN DEVELOPMENT</text>
  </svg>`);
  await sharp(background).composite([{ input: overlay }]).jpeg({ quality: 90, mozjpeg: true }).toFile(path.join(assets, 'social-preview-v1.jpg'));
  console.log('Prepared five project images, responsive copies, PNG icons, and a 1200 × 630 social preview.');
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
