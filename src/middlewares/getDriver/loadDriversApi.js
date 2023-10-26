const fetchDrivers = require('../../helpers/fetchDrivers');

async function loadDriversApi(req, res, next) {
  try {
    const driversApi = await fetchDrivers();

    if (typeof driversApi === undefined || !driversApi.length)
      return res
        .status(500)
        .json({ error: 'La respuesta de la API no contiene datos' });

    req.driversApi = driversApi;
    next();
  } catch (error) {
    return res.status(500).json({ error });
  }
}

module.exports = loadDriversApi;
