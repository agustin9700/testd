const puppeteer = require('puppeteer');
const fs = require('fs');
require("dotenv").config

async function miembros(nombrearchivo) {
  try {
    const browser = await puppeteer.launch();
    const browser = await puppeteer.launch({
      args:[
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--single-process",
        "--no-zygote",
      ]
      executablePath: process.env.PUPPERTEER_EXECUTABLE_PATH,
    });

    ;
    const page = await browser.newPage();
    
    await page.goto('https://playshinobirevenge.com/clan-ranking/146/details', { waitUntil: 'networkidle0' });
    
    await page.waitForSelector('tbody tr', { timeout: 5000 }); // 10 segundos de timeout
    
    
    const listaMembers = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('tbody tr'));
      return rows.map(row => {
        const columns = row.querySelectorAll('td');
        return {
          name: columns[0]?.textContent?.trim() || '',
          reputation: parseInt(columns[2]?.textContent?.trim() || '0', 10)
        };
      });
    });
    fs.writeFileSync(nombrearchivo, JSON.stringify(listaMembers, null, 2));
    await browser.close();
    return listaMembers;
  } catch (error) {
    console.error('Ocurrió un error:', error);
    return [];
  }
}
async function diferencia() {
  try {
    for (let i = 0; i < 99999; i++) {
      console.log('\x1b[32m%s\x1b[0m', `Ejecución datos 10s: ${i}`);
      const datos = await miembros(`datos10s.json`);
      await new Promise(resolve => setTimeout(resolve, 5000));
      const nuevosDatos = await miembros(`nuevosdatos10s.json`);
      const resultadosResto = nuevosDatos.map((nuevoDato, index) => ({
        rank: index + 1,
        Nombre: nuevoDato.name,
        ReputationOriginal: datos[index]?.reputation || 0,
        ReputationNueva: nuevoDato.reputation,
        Diferencia: nuevoDato.reputation - (datos[index]?.reputation || 0)
      }));
      fs.writeFileSync('resultados.json', JSON.stringify(resultadosResto, null, 2));
      console.log('Resultados guardados en resultados.json');
    }
  } catch (error) {
    console.error('Ocurrió un error en la función diferencia:', error);
  }
}
module.exports= diferencia