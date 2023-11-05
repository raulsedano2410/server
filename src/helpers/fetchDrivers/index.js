require('dotenv').config();

const { fetchDataApi, buildUrl } = require('./requests');
const { setCache, getFromCache } = require('./cache');

async function fetchDrivers(obj = null) {
  // Actualiza el estado de la variable cache
  let driverCache = setCache();

  // Revisar cache
  if (driverCache.length > 1 && !obj) {
    // Retornar cache si existe
    return driverCache;
  }

  let url;
  let key;
  let value;

  // Obtener key y value del objeto
  if (obj) {
    [key, value] = Object.entries(obj)[0];
  }

  try {
    // Petición si no hay objeto
    if (!obj) {
      // Obtener datos de API
      url = buildUrl();
      const driversData = await fetchDataApi(url);

      // Guardar en cache
      const cache = setCache(driversData);

      // Retornar cache
      return cache;
    }

    // Buscar por firstName
    if (key === 'forename') {
      // Formatear value
      const cleanValue =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

      // Petición si no hay cache
      if (!driverCache.length) {
        url = buildUrl('?name.forename=', cleanValue);

        const dataFromApi = await fetchDataApi(url);
        return dataFromApi;
      }
      // Buscar en cache
      const dataFromCache = getFromCache(key, cleanValue, driverCache);
      return dataFromCache;
    }

    // Buscar por ID
    if (key === 'id') {
      // Petición si no hay cache
      if (!driverCache.length) {
        url = buildUrl('/', value);
        console.log(url);
        const dataFromApi = await fetchDataApi(url);
        return dataFromApi;
      }
      // Buscar en cache
      const dataFromCache = getFromCache(key, value, driverCache);
      return dataFromCache;
    }
  } catch (error) {
    // Manejar error
    throw new Error('Fetch API Error: ' + error);
  }
}

module.exports = fetchDrivers;
