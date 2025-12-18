#!/usr/bin/env node
/**
 * Export a fixed-size OpenGraph social card (1200×630) from local HTML.
 *
 * Usage:
 *   node export-card/export.js
 *
 * Output:
 *   export-card/output/og-image.jpg
 */

const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

async function main() {
  const puppeteer = require('puppeteer');

  const rootDir = __dirname;
  const cardPath = path.join(rootDir, 'card.html');
  const outputDir = path.join(rootDir, 'output');
  const outputPath = path.join(outputDir, 'og-image.jpg');

  if (!fs.existsSync(cardPath)) {
    throw new Error(`card.html not found at: ${cardPath}`);
  }

  fs.mkdirSync(outputDir, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--font-render-hinting=medium',
    ],
  });

  try {
    const page = await browser.newPage();

    // 1200×630 logical pixels, retina export (x2)
    await page.setViewport({
      width: 1200,
      height: 630,
      deviceScaleFactor: 2,
    });

    const fileUrl = pathToFileURL(cardPath).toString();

    await page.goto(fileUrl, { waitUntil: 'networkidle0' });
    await page.emulateMediaType('screen');

    // Give fonts a tiny moment to settle (Google Fonts).
    await new Promise((r) => setTimeout(r, 250));

    // Ensure the canvas exists and compute clip precisely.
    const clip = await page.evaluate(() => {
      const el = document.getElementById('og-canvas') || document.querySelector('.card');
      if (!el) throw new Error('Could not find canvas element (#og-canvas or .card)');
      const r = el.getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, height: r.height };
    });

    // Target: < 300 KB if possible. With deviceScaleFactor=2, the JPEG can be larger,
    // so we adapt quality down until the size fits or we hit a floor.
    const targetBytes = 300 * 1024;
    let quality = 90;
    let buffer = null;

    while (quality >= 60) {
      buffer = await page.screenshot({
        type: 'jpeg',
        quality,
        clip,
        captureBeyondViewport: false,
        omitBackground: false,
      });

      if (buffer.length <= targetBytes) break;
      quality -= 5;
    }

    fs.writeFileSync(outputPath, buffer);

    const kb = Math.round(buffer.length / 1024);
    console.log(`✅ OpenGraph image generated: ${outputPath} (${kb} KB, quality=${quality}, dpr=2)`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error('❌ Export failed:', err);
  process.exit(1);
});
