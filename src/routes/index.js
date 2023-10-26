const { Router } = require('express');
const welcome = require('../controllers/welcome');
const getDrivers = require('../controllers/getDrivers');
const getTeams = require('../controllers/getTeams');
const getDriverByName = require('../controllers/getDriverByName');
const getDriverById = require('../controllers/getDriverById');
const postDrivers = require('../controllers/postDrivers');
const postDriverValidate = require('../middlewares/postDrivers/postDriverValidate');
const loadDriversApi = require('../middlewares/getDriver/loadDriversApi');
const loadDriversDb = require('../middlewares/getDriver/loadDriversDb');
const fetchDriverByName = require('../middlewares/getDriverByName/fetchDriverByName');
const getByNameInDb = require('../middlewares/getDriverByName/getByNameInDb');

const router = Router();

// Defeinir rutas y controladores correspondientes.

// Ruta de bienvenida.
router.get('/', welcome);

// Ruta para obtener todos los drivers.
router.get('/drivers', loadDriversApi, loadDriversDb, getDrivers);

// Ruta para actualizar los 'team' de la API en la db
router.get('/drivers/teams', getTeams);

// Ruta para obtener drivers por nombre.
router.get('/drivers/name', fetchDriverByName, getByNameInDb, getDriverByName);

// Ruta para obtener drivers por ID
router.get('/drivers/:id', getDriverById);

// Ruta para crear un nuevo driver.
router.post('/drivers', postDriverValidate, postDrivers);

module.exports = router;
