function extractUniqueTeams(dataDrivers) {
  const uniqueTeams = dataDrivers
    // Filtramos los objetos que tienen la propiedad 'teams'
    .filter(({ teams }) => teams)
    // Creamos un array de cadenas (cada cadena es una lista de teams separados por comas)
    .map(({ teams }) => teams)
    // Unimos todas las cadenas en una sola súper cadena
    .join(',')
    // Dividimos la súper cadena en una lista de teams individuales
    .split(',')
    // Eliminamos espacios en blanco al principio y al final de cada team
    .map((team) => team.trim())
    // Eliminamos duplicados manteniendo solo teams únicos
    .reduce((acc, team) => (acc.includes(team) ? acc : [...acc, team]), [])
    //Damos el formato adecuado para usar con bulkCreate de Sequelize
    .map((team) => ({
      name: team,
    }));

  return uniqueTeams;
}
module.exports = extractUniqueTeams;
