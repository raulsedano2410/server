require('dotenv').config();

const { fetchDataApi, buildUrl } = require('./requests');
const { setCache, getFromCache } = require('./cache');

async function fetchDrivers(obj = null) {
  let url;
  let key = '';
  let value = '';

  // Actualiza el estado de la variable cache
  let driverCache = setCache();
  // Obtener key y value del objeto
  if (obj) {
    [key, value] = Object.entries(obj)[0];
  }

  try {
    // Revisar cache
    if (driverCache?.length > 1 && !obj) {
      // Retornar cache si existe
      return driverCache;
    }

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
      const dataFromCache = getFromCache(key, cleanValue);
      return dataFromCache;
    }

    // Buscar por ID
    if (key === 'id') {
      // Petición si no hay cache
      if (!driverCache.length) {
        url = buildUrl('/', value);
        const dataFromApi = await fetchDataApi(url);
        return dataFromApi;
      }
      // Buscar en cache
      const dataFromCache = getFromCache(key, value);
      return dataFromCache;
    }
  } catch (error) {
    // Manejar error
    throw new Error('Fetch API Error: ' + error);
  }
}

module.exports = fetchDrivers;
