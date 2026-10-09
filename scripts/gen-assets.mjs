// Generates public/og.png (1200x630) and public/apple-touch-icon.png (180x180)
// from SVG strings via @resvg/resvg-js. Needs a CJK-capable font on this machine.
import { Resvg } from '@resvg/resvg-js';
import { existsSync, readdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function findFonts() {
  const found = [];
  const candidates = [
    '/System/Library/Fonts/Hiragino Sans GB.ttc',
    '/Library/Fonts/NotoSansTC-Bold.otf',
    '/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc',
    '/usr/share/fonts/noto-cjk/NotoSansCJK-Bold.ttc',
    'C:\\Windows\\Fonts\\msjhbd.ttc',
  ];
  for (const c of candidates) if (existsSync(c)) found.push(c);
  const assets = '/System/Library/AssetsV2/com_apple_MobileAsset_Font8';
  if (existsSync(assets)) {
    for (const d of readdirSync(assets)) {
      const p = join(assets, d, 'AssetData', 'PingFang.ttc');
      if (existsSync(p)) found.unshift(p);
    }
  }
  return found;
}

const fontFiles = findFonts();
if (fontFiles.length === 0) throw new Error('No CJK font found; install Noto Sans TC and retry.');
const fontOpts = {
  fontFiles,
  loadSystemFonts: false,
  defaultFontFamily: 'PingFang TC',
};
const family = `'PingFang TC','Hiragino Sans GB','Noto Sans TC','Microsoft JhengHei',sans-serif`;

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0b0f14"/>
  <text x="90" y="330" font-family="${family}" font-size="200" font-weight="700" fill="#e6e9ee">值日</text>
  <text x="96" y="392" font-family="${family}" font-size="40" fill="#9aa4b2" letter-spacing="6">zhiri</text>
  <rect x="96" y="448" width="120" height="4" fill="#f5b544"/>
  <text x="96" y="510" font-family="${family}" font-size="34" fill="#9aa4b2">獨立開發者工作室，做自己會每天用的工具。</text>
</svg>`;

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="#0b0f14"/>
  <text x="90" y="134" text-anchor="middle" font-family="${family}" font-size="120" font-weight="700" fill="#f5b544">值</text>
</svg>`;

function render(svg, width, out) {
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: width }, font: fontOpts }).render().asPng();
  writeFileSync(join(root, 'public', out), png);
  console.log(`wrote public/${out} (${png.length} bytes)`);
}

render(og, 1200, 'og.png');
render(icon, 180, 'apple-touch-icon.png');
