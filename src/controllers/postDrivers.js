const { Driver, Team } = require('../db');

async function postDrivers(req, res) {
  // Validar si existen teams para usarlos en la creación
  const count = await Team.count();

  if (count === 0) {
    const teamBuildingMessage =
      'No teams found, please create teams before adding drivers';
    return res.status(500).json({ teamBuildingMessage });
  }

  try {
    const driverData = req.body;

    const newDriver = await Driver.create(driverData);

    await newDriver.addTeams(driverData.teams);

    const message = `The driver ${newDriver.firstName} weas created!`;

    if (newDriver.firstName) {
      res.status(201).json(message);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

module.exports = postDrivers;
