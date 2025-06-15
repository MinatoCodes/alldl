const puppeteer = require('puppeteer');

async function getDownloadLinks(videoUrl) {
  const browser = await puppeteer.launch({
    headless: 'new', // important for latest Puppeteer
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--no-zygote',
      '--disable-dev-shm-usage'
    ],
  });


  const page = await browser.newPage();
  try {
    await page.goto('https://en1.savefrom.net/13RZ/', { waitUntil: 'networkidle2' });

    await page.type('input#sf_url', videoUrl);
    await page.click('button[type="submit"]');

    await page.waitForSelector('.def-btn-box a', { timeout: 20000 });

    const links = await page.evaluate(() => {
      const buttons = document.querySelectorAll('.def-btn-box a');
      return Array.from(buttons).map(a => ({
        quality: a.innerText.trim(),
        url: a.href
      }));
    });

    return links;
  } catch (error) {
    console.error('Error while scraping:', error.message);
    return null;
  } finally {
    await browser.close();
  }
}

module.exports = { getDownloadLinks };
