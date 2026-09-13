import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
import assert from 'node:assert/strict';
const root = resolve('dist');
const mime = { '.html':'text/html', '.css':'text/css', '.js':'application/javascript', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.webp':'image/webp', '.woff2':'font/woff2' };
const server = createServer((req,res) => {
  let file = resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
  if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403).end(); return; }
  if (existsSync(file) && statSync(file).isDirectory()) file = resolve(file, 'index.html');
  if (!existsSync(file)) { res.writeHead(404).end(); return; }
  res.setHeader('Content-Type', mime[extname(file)] || 'text/plain'); res.end(readFileSync(file));
});
await new Promise(done => server.listen(4322,'127.0.0.1',done));
const browser = await chromium.launch({ channel: 'chrome', headless:true });
const errors = [];
const failures = [];
const results = [];
mkdirSync('.artifacts',{recursive:true});
try {
  const context = await browser.newContext({ viewport:{width:1440,height:1000} });
  const page = await context.newPage();
  page.on('pageerror',error => errors.push(error.message));
  page.on('response',response => { if(response.status() >= 400) failures.push(`${response.status()} ${response.url()}`); });
  await page.goto('http://127.0.0.1:4322/',{waitUntil:'networkidle'});
  await page.waitForTimeout(1500);
  assert.equal(await page.locator('h1').count(),1);
  assert.equal(await page.locator('h1').innerText(),'Twój pomysł.\nW końcu\nw działaniu.');
  const eyebrowTop = await page.locator('.hero-copy>.micro').evaluate(element => element.getBoundingClientRect().top);
  assert.ok(eyebrowTop >= 78, 'Sticky header must not cover hero content');
  await page.screenshot({path:'.artifacts/desktop-hero.png'});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth),true);
  await page.locator('.hero-ctas .brand-text-link').click();
  await page.waitForTimeout(1800);
  assert.equal(new URL(page.url()).hash,'#proces');
  await page.screenshot({path:'.artifacts/desktop-process.png'});
  await page.locator('.motion-toggle').click();
  await page.waitForFunction(()=>document.querySelector('hyperframes-player')?.ready,{},{timeout:25000});
  await page.waitForFunction(()=>document.querySelector('hyperframes-player')?.currentTime>1);
  await page.screenshot({path:'.artifacts/motion-playing.png'});
  await page.locator('.motion-toggle').click();
  assert.equal(await page.locator('.motion-toggle').getAttribute('aria-pressed'),'false');
  const pausedTime = await page.evaluate(()=>document.querySelector('hyperframes-player').currentTime);
  await page.waitForTimeout(500);
  assert.ok(Math.abs(await page.evaluate(()=>document.querySelector('hyperframes-player').currentTime)-pausedTime)<.15);
  await page.locator('.motion-toggle').click();
  await page.waitForFunction(()=>document.querySelector('hyperframes-player')?.currentTime>9);
  await page.screenshot({path:'.artifacts/motion-final.png'});
  await page.locator('.motion-toggle').click();
  results.push('HyperFrames loads locally, plays, pauses and resumes across all three scenes');
  await page.locator('a.nav-contact').click();
  await page.waitForTimeout(1600);
  await page.locator('#project-description').fill('Potrzebuję nowej strony dla mojej marki — z polskimi znakami: ąćęłńóśźż.');
  await page.getByRole('button',{name:'Przygotuj e-mail'}).click();
  const href = await page.locator('.email-draft-link').getAttribute('href');
  assert.ok(href.startsWith('mailto:delta240mvt@gmail.com?'));
  assert.match(decodeURIComponent(href),/ąćęłńóśźż/);
  assert.equal(await page.locator('.form-status').isVisible(),true);
  results.push('Contact prepares an encoded mailto draft without sending');
  await context.close();
  for (const width of [1440,1024,820,390,320]) {
    const context = await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
    const page = await context.newPage();
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto('http://127.0.0.1:4322/',{waitUntil:'networkidle'});
    await page.evaluate(()=>document.fonts.ready);
    const overflow = await page.evaluate(()=>({doc:document.documentElement.scrollWidth,viewport:innerWidth,offenders:[...document.querySelectorAll('body *')].filter(el=>el.getBoundingClientRect().right>innerWidth+1 && el.getBoundingClientRect().width>0).map(el=>el.className).slice(0,10)}));
    assert.ok(overflow.doc<=width,JSON.stringify(overflow));
    assert.equal(await page.locator('hyperframes-player').count(),0,'Motion does not autoplay for reduced motion');
    if(width<=820) {
      await page.locator('.menu-toggle').click();
      assert.equal(await page.locator('#mobile-menu').isVisible(),true);
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('#mobile-menu').isVisible(),false);
      await page.locator('.menu-toggle').click();
      await page.locator('#mobile-menu a').first().click();
      assert.equal(await page.locator('#mobile-menu').isVisible(),false);
    }
    await page.locator('.faq-list summary').first().click();
    assert.equal(await page.locator('.faq-list details').first().getAttribute('open'),'');
    await page.evaluate(() => window.scrollTo(0,0));
    await page.waitForTimeout(200);
    await page.screenshot({path:`.artifacts/refresh-${width}.png`,fullPage:true});
    results.push(`${width}px: no horizontal overflow, readable reduced-motion layout, FAQ/menu work`);
    await context.close();
  }
  const noJs = await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const staticPage = await noJs.newPage();
  await staticPage.goto('http://127.0.0.1:4322/');
  assert.equal(await staticPage.locator('h1').isVisible(),true);
  await staticPage.locator('.faq-list summary').first().click();
  assert.equal(await staticPage.locator('.faq-list details').first().getAttribute('open'),'');
  results.push('No JavaScript: sales copy, FAQ and direct email remain available');
  assert.deepEqual(errors,[],'Browser errors');
  assert.deepEqual(failures,[],'Failed assets');
  writeFileSync('.artifacts/verification.json',JSON.stringify({results,errors,failures},null,2));
  console.log(JSON.stringify({results,errors,failures},null,2));
} finally { await browser.close(); server.close(); }
