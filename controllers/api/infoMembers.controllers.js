
const fs = require('fs').promises;
module.exports = async function(req, res) {
    try {
        const data = await fs.readFile('resultados.json', 'utf-8');
        
        let jsonData;
        try {
            jsonData = JSON.parse(data);
        } catch (parseErr) {
            console.error('Error al analizar el JSON:', parseErr);
            return res.status(500).send('Error al analizar el archivo JSON');
        }
      
        res.send(jsonData);
    } catch (err) {
        console.error('Error al leer el archivo JSON:', err);
        res.status(500).send('Error al leer el archivo JSON');
    }
};