const express = require('express');
const router = require('./routes');
const morgan = require('morgan');
const cors = require('cors');

const server = express();
server.use(express.static('public'));
server.set('view engine', 'ejs'); //npm install ejs
server.use(morgan('dev'));
server.use(express.json());
server.use(cors());

server.use(router);

//Manejo de errores.
server.use((err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || err;
  console.log(err);
  res.status(status).json({ message });
});

module.exports = server;
