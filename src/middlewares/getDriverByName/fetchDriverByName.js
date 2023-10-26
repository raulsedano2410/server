const fetchDrivers = require('../../helpers/fetchDrivers');

async function fetchDriverByName(req, res, next) {
  try {
    const { forename } = req.query;

    // Valida que se usa la palabra clave 'forename'
    if (!forename) {
      return res
        .status(400)
        .json({ error: "La query de llamarse 'forename' " });
    }

    // Valida que se ingrese una cadena y no un numero
    if (!isNaN(parseInt(forename))) {
      return res
        .status(400)
        .json({ error: 'El valor de forename debe ser una cadena' });
    }
    
    const driversFromApi = await fetchDrivers({ forename });

    req.driversFromApi = driversFromApi;

    next();
  } catch (error) {
    res.status(500).json({ error });
  }
}
module.exports = fetchDriverByName;
