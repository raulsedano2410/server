const { Driver } = require('../db');

async function postDrivers(req, res) {
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
