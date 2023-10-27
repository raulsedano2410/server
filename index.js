const dotenv = require('dotenv');
const server = require('./src/server');
const { conn } = require('./src/db.js');

// Carga las variables de entorno desde el archivo .env
dotenv.config();

const port = process.env.PORT || 3001;

async function start() {
  try {
    await conn.authenticate();
    console.log('Connection has been established successfully.');

    await conn.sync({ force: true });

    server.listen(port, () => {
      console.log('%s listening at : http://localhost:%s', 'Server', port);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

start();
