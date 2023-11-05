const fetchDrivers = require('../../helpers/fetchDrivers');

async function fetchDriverByName(req, res, next) {
  const { forename } = req.query;

  // Valida que se usa la palabra clave 'forename'
  if (!forename) {
    return res
      .status(400)
      .json({ error: "La query debe llamarse 'forename' " });
  }

  // Valida que se ingrese una cadena y no un numero
  if (!isNaN(parseInt(forename))) {
    return res
      .status(400)
      .json({ error: 'El valor de forename debe ser una cadena' });
  }
  try {
    const driversFromApi = await fetchDrivers({ forename });

    req.driversFromApi = driversFromApi;

    next();
  } catch (error) {
    next(error);
  }
}
module.exports = fetchDriverByName;
