const fetchDrivers = require('../helpers/fetchDrivers');
async function getDriverById(req, res) {
  try {
    const { id } = req.params;
    const driversFromApi = await fetchDrivers({ id });

    return res.status(200).json(driversFromApi);
  } catch (error) {
    return res.status(500).json({ error });
  }
}
module.exports = getDriverById;
