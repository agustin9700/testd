const puppeteer = require('puppeteer');

async function run (){
  const browser = await puppeteer.launch({
    executablePath: '', // Ruta al navegador
    headless: true // O false si quieres ver el navegador
  });

  const page = await browser.newPage();
  await page.goto('https://example.com');
  console.log(await page.title());

  await browser.close();
};
module.exports=run