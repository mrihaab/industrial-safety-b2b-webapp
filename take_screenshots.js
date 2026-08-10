const puppeteer = require('puppeteer-core');
const path = require('path');

const ARTIFACTS_DIR = 'C:\\Users\\My PC\\.gemini\\antigravity\\brain\\f11013cd-61a3-46f9-b3f9-cc7c3305083e';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:3000';

async function run() {
  console.log('Launching Chrome for Upwork Screenshots...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']
  });

  const page = await browser.newPage();

  // Set high DPI viewport
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });

  // 1. First visit home to initialize domain origin
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });

  // 2. Set Admin Auth Tokens in localStorage
  await page.evaluate(() => {
    localStorage.setItem('gsh_admin_token', 'valid-admin-jwt-token-demo');
    localStorage.setItem('gsh_admin_user', JSON.stringify({
      id: 1,
      username: 'admin',
      email: 'admin@ghulamsafety.com',
      role: 'admin'
    }));
  });

  console.log('Admin Auth LocalStorage Token injected successfully.');

  const screenshots = [
    { name: '1_home_page_hero.png', url: `${BASE_URL}/`, viewport: { width: 1920, height: 1080 } },
    { name: '2_product_catalog.png', url: `${BASE_URL}/products`, viewport: { width: 1920, height: 1080 } },
    { name: '3_product_details.png', url: `${BASE_URL}/products/titan-shield-welding-gloves`, viewport: { width: 1920, height: 1080 } },
    { name: '4_rfq_inquiry_page.png', url: `${BASE_URL}/rfq`, viewport: { width: 1920, height: 1080 } },
    { name: '5_admin_dashboard.png', url: `${BASE_URL}/admin/dashboard`, viewport: { width: 1920, height: 1080 } },
    { name: '6_admin_product_management.png', url: `${BASE_URL}/admin/products`, viewport: { width: 1920, height: 1080 } },
    { name: '7_admin_inquiry_management.png', url: `${BASE_URL}/admin/inquiries`, viewport: { width: 1920, height: 1080 } },
    { name: '8_mobile_responsive_view.png', url: `${BASE_URL}/`, viewport: { width: 390, height: 844, isMobile: true } }
  ];

  for (const item of screenshots) {
    console.log(`Capturing ${item.name} (${item.url})...`);
    await page.setViewport({ ...item.viewport, deviceScaleFactor: 2 });
    try {
      await page.goto(item.url, { waitUntil: 'networkidle2', timeout: 20000 });
      await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));
      const outputPath = path.join(ARTIFACTS_DIR, item.name);
      await page.screenshot({ path: outputPath, fullPage: false });
      console.log(`Successfully captured: ${outputPath}`);
    } catch (err) {
      console.error(`Failed ${item.name}:`, err.message);
    }
  }

  await browser.close();
  console.log('ALL 8 UPWORK PORTFOLIO SCREENSHOTS CAPTURED WITH AUTHENTICATED ADMIN DASHBOARD!');
}

run();
