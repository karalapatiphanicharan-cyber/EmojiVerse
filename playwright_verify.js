import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Start server and wait
  const { exec } = await import('child_process');
  const server = exec('npm run dev');

  await new Promise(resolve => setTimeout(resolve, 5000));

  try {
    await page.goto('http://localhost:5173');
    await page.screenshot({ path: 'home.png', fullPage: true });

    await page.goto('http://localhost:5173/studio');
    await page.screenshot({ path: 'studio.png', fullPage: true });

    // Switch to animator
    await page.click('button:has-text("Animator")');
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.screenshot({ path: 'animator.png', fullPage: true });

    await page.goto('http://localhost:5173/gallery');
    await page.screenshot({ path: 'gallery.png', fullPage: true });

    await page.goto('http://localhost:5173/about');
    await page.screenshot({ path: 'about.png', fullPage: true });

    console.log('Screenshots captured successfully');
  } catch (e) {
    console.error('Error during verification:', e);
  } finally {
    server.kill();
    await browser.close();
  }
})();
