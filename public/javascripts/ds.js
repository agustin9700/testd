const puppeteer = require('puppeteer');

async function run (){
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome', // Cambia esta ruta a la correcta para tu entorno
    userDataDir: "/opt/render/.cache/puppeteer/chrome/linux-127.0.6533.99/chrome-linux64/chrome",
    headless: true // O false si quieres ver el navegador
  });

  const page = await browser.newPage();
  await page.goto('https://example.com');
  console.log(await page.title());

  await browser.close();
};
module.exports = run;
