const axios = require('axios');

const url = 'https://example.com'; // Cambia esto a la URL que necesites
const requestsPerSecond = 1000;
const totalRequests = 10000; // Número total de solicitudes que deseas enviar

let sentRequests = 0;

const sendRequest = async () => {
  try {
    const response = await axios.get(url);
    console.log(`Solicitud enviada. Estado: ${response.status}`);
  } catch (error) {
    console.error('Error al enviar la solicitud:', error.message);
  }
};

const startSendingRequests = () => {
  // Controlar el envío de solicitudes
  const interval = setInterval(() => {
    for (let i = 0; i < requestsPerSecond; i++) {
      if (sentRequests >= totalRequests) {
        clearInterval(interval);
        console.log('Todas las solicitudes han sido enviadas.');
        break;
      }
      sendRequest();
      sentRequests++;
    }
  }, 1000);
};

// Exporta la función que inicia el envío de solicitudes
module.exports =  startSendingRequests ;
