let driverCache = [];

function setCache(data = driverCache) {
  driverCache = [...data];
  return driverCache;
}

// Buscar en cache
async function getFromCache(key, value) {
  // Encontrar por key y value
  return driverCache.find((driver) => driver[key] === value);
}

module.exports = {
  getFromCache,
  setCache,
};
