const { Driver, Team } = require('../../db');

async function loadDriversDb(req, res, next) {
  try {
    const driversDb = await Driver.findAll({
      include: {
        model: Team,
        attribute: ['name'],
        through: {
          attributes: [],
        },
      },
    });
    req.driversDb = driversDb;
    next();
  } catch (error) {
    res.status(500).json({ error });
  }
}

module.exports = loadDriversDb;
