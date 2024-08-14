// const axios = require('axios');
// const fs = require('fs');
// const cheerio = require('cheerio');

// async function miembros(nombrearchivo) {
//   try {
//     const response = await axios.get('https://playshinobirevenge.com/clan-ranking/146/details');
//     const $ = cheerio.load(response.data);

//     const listaMembers = $('tbody tr').map((index, element) => {
//       const columns = $(element).find('td');
//       return {
//         name: $(columns[0]).text().trim() || '',
//         reputation: parseInt($(columns[2]).text().trim() || '0', 10),
//       };
//     }).get();

//     fs.writeFileSync(nombrearchivo, JSON.stringify(listaMembers, null, 2));
//     return listaMembers;
//   } catch (error) {
//     console.error('Ocurrió un error:', error);
//     return [];
//   }
// }

// async function diferencia() {
//   try {
//     for (let i = 0; i < 99999; i++) { // Bucle infinito - Asegúrate de que esto es lo que deseas
//       console.log('\x1b[32m%s\x1b[0m', `Ejecución datos 10s: ${i}`);
//       const datos = await miembros(`datos10s.json`);

//       await new Promise(resolve => setTimeout(resolve, 5000));
      
//       const nuevosDatos = await miembros(`nuevosdatos10s.json`);

//       const resultadosResto = nuevosDatos.map((nuevoDato, index) => ({
//         rank: index + 1,
//         Nombre: nuevoDato.name,
//         ReputationOriginal: datos[index]?.reputation || 0,
//         ReputationNueva: nuevoDato.reputation,
//         Diferencia: nuevoDato.reputation - (datos[index]?.reputation || 0),
//       }));

//       fs.writeFileSync('resultados.json', JSON.stringify(resultadosResto, null, 2));
//       console.log('Resultados guardados en resultados.json');
//     }
//   } catch (error) {
//     console.error('Ocurrió un error en la función diferencia:', error);
//   }
// }

// module.exports = diferencia;

const puppeteer = require('puppeteer');
const fs = require('fs');
require("dotenv").config();

async function miembros(nombrearchivo) {
  try {
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('PUPPETEER_EXECUTABLE_PATH:', process.env.PUPPETEER_EXECUTABLE_PATH);

    const executablePath = process.env.NODE_ENV === "production"
      ? process.env.PUPPETEER_EXECUTABLE_PATH
      : puppeteer.executablePath();

    console.log('Attempting to launch browser with executable path:', executablePath);

    const browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        "--single-process",
        "--no-zygote",
      ],
      executablePath: executablePath,
      headless: "new"
    });

    console.log('Browser launched successfully');

    const page = await browser.newPage();
    await page.goto('https://playshinobirevenge.com/clan-ranking/146/details', { waitUntil: 'networkidle0' });
    await page.waitForSelector('tbody tr', { timeout: 10000 });

    const listaMembers = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('tbody tr'));
      return rows.map(row => {
        const columns = row.querySelectorAll('td');
        return {
          name: columns[0]?.textContent?.trim() || '',
          reputation: parseInt(columns[2]?.textContent?.trim() || '0', 10),
        };
      });
    });

    fs.writeFileSync(nombrearchivo, JSON.stringify(listaMembers, null, 2));
    await browser.close();
    return listaMembers;
  } catch (error) {
    console.error('Ocurrió un error:', error);
    if (error.message.includes('Tried to find the browser at the configured path')) {
      console.error('Chrome executable not found. Please check the PUPPETEER_EXECUTABLE_PATH environment variable.');
      console.error('Current PUPPETEER_EXECUTABLE_PATH:', process.env.PUPPETEER_EXECUTABLE_PATH);
    }
    return [];
  }
}