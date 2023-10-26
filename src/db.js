require('dotenv').config();
const { Sequelize } = require('sequelize');

const fs = require('fs');
const path = require('path');

// const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DATA_BASE } = process.env;
const { DATA_BASE } = process.env;

const sequelize = new Sequelize(DATA_BASE, {
  dialect: 'postgres',
  logging: false,
  // native: false,
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //   },
  // },
});
// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/drivers`,
//   {
//     logging: false,
//     native: false,
//   },
// );
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Driver, Team } = sequelize.models;

// Aca vendrian las relaciones

Driver.belongsToMany(Team, { through: 'DriverTeam' });
Team.belongsToMany(Driver, { through: 'DriverTeam' });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
