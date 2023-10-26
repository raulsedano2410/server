const { Op } = require('sequelize');
const { Driver, Team } = require('../../db');

async function getByNameInDb(req, res, next) {
  const { forename } = req.query;

  try {
    const driversFromDb = await Driver.findAll({
      where: {
        firstName: {
          [Op.iLike]: `%${forename}`, // Búsqueda parcial del nombre
        },
      },
      // Agrega los 'teams' respectivos.
      include: {
        model: Team,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      },
    });

    // Modifica el formato de array de objetos(Teams) a array de cadenas(teams).
    const cleanDrivers = driversFromDb.map((driver) => {
      
      const { Teams, ...restDriver } = driver.toJSON();

      const teams = Teams.map((t) => t.name).join(', ');

      return { ...restDriver, teams };
    });

    req.driversFromDb = cleanDrivers;

    next();
  } catch (error) {
    res.status(500).json({ error });
  }
}
module.exports = getByNameInDb;
