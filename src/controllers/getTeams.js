const { Team } = require('../db');
const fetchDrivers = require('../helpers/fetchDrivers');
const extractUniqueTeams = require('../helpers/ExtractUniqueTeams');

async function getTeams(_, res) {
  try {
    // Consultar teams en la DB
    let dbTeams = await Team.findAll();

    // Si no hay datos, llamar a la API
    if (!dbTeams.length) {
      const response = await fetchDrivers();
      const teams = extractUniqueTeams(response);

      //  Guardar teams en la DB
      dbTeams = await Team.bulkCreate(teams, { updateOnDuplicate: ['name'] });
    }

    // Devolver teams
    return res.status(200).json(dbTeams);
  } catch (error) {
    return res.status(500).json({ error });
  }
}
module.exports = getTeams;
