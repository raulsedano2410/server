const dotenv = require('dotenv');
const server = require('./src/server');
const { conn } = require('./src/db.js');

// Carga las variables de entorno desde el archivo .env
dotenv.config();

const port = process.env.PORT || 3001;

conn
  .sync({ force: true })
  .then(() => {
    server.listen(port, () => {
      console.log('%s listening at : http://localhost:%s', 'Server', port);
    });
  })
  .catch((error) => console.error(error));
