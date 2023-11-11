require('dotenv').config();
const mapDriversData = require('./mapDriversData');

// Constante para URL base de API
const { BASE_URL: url } = process.env;
// Petición a API
async function fetchDataApi(url) {
  try {
    // Configurar petición
    const headers = { Accept: 'application/json' };

    //petición
    const response = await fetch(url, { headers });

    // Parsear respuesta
    const data = await response.json();

    // Mapear datos
    const drivers = mapDriversData(data);
    return drivers;
  } catch (error) {
    throw new Error('fetchDataApi failed', { cause: error });
  }
}
// Arma la ruta del endpoint de la API
function buildUrl(path, value) {
  if (!path) return url.concat('/drivers');

  return url.concat('/drivers').concat(path).concat(value);
}

module.exports = {
  fetchDataApi,
  buildUrl,
};
