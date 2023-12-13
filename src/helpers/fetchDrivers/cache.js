let driverCache = [];

function setCache(data = driverCache) {
  driverCache = [...data];
  return driverCache;
}

// Buscar en cache
function getFromCache(key, value) {
  if (key === 'forename') {
    const dataByName = driverCache.filter(
      ({ firstName }) => firstName === value,
    );
    return dataByName;
  }
  if (key === 'id') {
    console.log(key, value);

    const dataById = driverCache.find(
      ({ id }) => parseInt(id) === parseInt(value),
    );

    return dataById;
  }
}

module.exports = {
  getFromCache,
  setCache,
};
