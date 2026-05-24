import { chromium, devices } from 'playwright';
import path from 'path';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext(devices['iPhone 13']);
  const page = await context.newPage();

  console.log('Navigating to http://localhost:4321 ...');
  await page.goto('http://localhost:4321', { waitUntil: 'networkidle' });

  const artifactDir = 'C:\\Users\\delta\\.gemini\\antigravity-ide\\brain\\387630e6-123a-4363-9e93-33b09bb5eda7';
  
  await page.screenshot({ path: path.join(artifactDir, 'mobile_full_page.png'), fullPage: true });

  console.log('Screenshot saved to artifacts.');
  await browser.close();
})();
