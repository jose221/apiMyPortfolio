const fs = require('fs');
fs.appendFileSync('boot.log', `[${new Date().toISOString()}] Iniciando aplicación Node.js...\n`);

// Función para obtener la hora local de Cancún en ISO-like
const getCancunTime = () => {
 return new Date().toLocaleString('sv-SE', {
  timeZone: 'America/Cancun',
  hour12: false
 }).replace(' ', 'T') + ':00';
};

// Función para convertir fecha legible en español (ej. "07 de junio de 2025")
const getCancunDateFormatted = () => {
 return new Date().toLocaleString('es-MX', {
  timeZone: 'America/Cancun',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true
 });
};

// Crear archivo build-info.json
const buildInfo = {
 version: '1.0.1',
 deployedAt: getCancunTime(),
 deployedAtToString: getCancunDateFormatted()
};
fs.writeFileSync('build-info.json', JSON.stringify(buildInfo, null, 2));

const express = require('express');
require('express-group-routes');
const bodyparser = require('body-parser');

const APIAuth = require('./routes/api-auth');
const APIUser = require('./routes/api-user');
const APIProfessionaleExperience = require('./routes/api-professional-experience');
const APIknowledges = require('./routes/api-Knowledge');
const APIUploadFile = require('./routes/api-upload-file');
const APIKnowledgesAbilities = require('./routes/api-knowledges-abilities');
const APIMyContacts = require('./routes/api-my-contacts');
const APIPersonalProjects = require('./routes/api-personal-projects');
const APIPortfolio = require('./routes/api-portfolios');
const APIPortfolioCategories = require('./routes/api-portfolio-categories');
const APIStudies = require('./routes/api-studies');
const APIMessages = require('./routes/api-messages');
const APIModules = require('./routes/api-modules');
const APIPermissions = require('./routes/api-permissions');
const ApiHistoryCV = require('./routes/api-history-cv');
const DataHerandroEvent = require('./routes/api-data-herandro-event');
const DataHerandroEventAction = require('./routes/api-data-herandro-event-action');
const APITools = require('./routes/api-tools');

const cors = require('cors');
const validateTokenAdmin = require('./app/middlewares/validateTokenAdmin');
const multipart = require('connect-multiparty');

const app = express();
const ws = require('express-ws')(app);
const LoggerModule = require("./modules/logger");
let _logger  = new LoggerModule();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.set('trust proxy', true);

const port = process.env.PORT;
fs.appendFileSync('boot.log', `[${new Date().toISOString()}] Puerto asignado: ${port || 'NO DEFINIDO'}\n`);

if (!port) {
 fs.appendFileSync('boot.log', `[${new Date().toISOString()}] ERROR: PORT no definido. Cerrando app.\n`);
 throw new Error("PORT no está definido. Asegúrate de que la app corre bajo Passenger en cPanel.");
}

app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));
app.use(multipart());

app.get('/', (req, res) => {
 try {
  const info = JSON.parse(fs.readFileSync('build-info.json'));
  res.set('Cache-Control', 'no-store');
  res.json({
   mensaje: '¡Hola Mundo!',
   version: info.version,
   deployedAt: info.deployedAt,
   deployedAtToString: info.deployedAtToString
  });
 } catch (err) {
  res.status(500).json({
   mensaje: '¡Hola Mundo!',
   error: 'No se pudo leer la información de versión'
  });
 }
});

app.get('/test', async (req, res) => {
 const { Sequelize } = require('sequelize');
 const database = require('./config/database');
 let connection = new Sequelize(database.DB_DATABASE, database.DB_USERNAME, database.DB_PASSWORD, {
  host: database.DB_HOST,
  dialect: database.DB_CONNECTION
 });

 try {
  await connection.authenticate();
  res.json({ mensaje: 'Connection has been established successfully.' });
 } catch (e) {
  _logger.logError("database", e)
  res.json({ mensaje: 'Unable to connect to the database:', error: e.message });
 }
});

const PREFIX_ROUTE = '/api/admin';
const PREFIX_ROUTE_PUBLIC = '/api';

app.use(PREFIX_ROUTE, APIAuth);
app.use(PREFIX_ROUTE, validateTokenAdmin, APIUser);
app.use(PREFIX_ROUTE, validateTokenAdmin, APIProfessionaleExperience);
app.use(PREFIX_ROUTE, validateTokenAdmin, APIknowledges);
app.use(PREFIX_ROUTE, validateTokenAdmin, APIKnowledgesAbilities);
app.use(PREFIX_ROUTE, validateTokenAdmin, APIMyContacts);
app.use(PREFIX_ROUTE, validateTokenAdmin, APIPersonalProjects);
app.use(PREFIX_ROUTE, validateTokenAdmin, APIPortfolio);
app.use(PREFIX_ROUTE, validateTokenAdmin, APIPortfolioCategories);
app.use(PREFIX_ROUTE, validateTokenAdmin, APIStudies);
app.use(PREFIX_ROUTE, validateTokenAdmin, APIMessages);
app.use(PREFIX_ROUTE, validateTokenAdmin, APIModules);
app.use(PREFIX_ROUTE, validateTokenAdmin, APIPermissions);
app.use(PREFIX_ROUTE, validateTokenAdmin, ApiHistoryCV);
app.use(PREFIX_ROUTE, validateTokenAdmin, DataHerandroEvent);
app.use(PREFIX_ROUTE, validateTokenAdmin, DataHerandroEventAction);
app.use(PREFIX_ROUTE, validateTokenAdmin, APIUploadFile);
app.use(PREFIX_ROUTE, validateTokenAdmin, APITools);
app.use('/storage', express.static(__dirname + '/public'));

const APIMyPortfolio = require('./routes/portfolio/api-portfolio');
app.use(PREFIX_ROUTE_PUBLIC, APIMyPortfolio);

const HerandroDataController = require("./app/controllers/HerandroDataController");
const {serve, setup} = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

app.ws('/test-socket', (socket, req) => {
 socket.on('message', (data) => {
  data = JSON.parse(data);
  if (!data.id) {
   HerandroDataController.init(socket, req, data);
  } else {
   HerandroDataController.action(socket, req, data);
  }
 });
});
app.use('/swagger', serve, setup(swaggerSpec));

// Ruta para servir el archivo swagger.json
app.get('/swagger.json', (req, res) => {
 res.setHeader('Content-Type', 'application/json');
 res.send(swaggerSpec);
});

app.listen(port, () => {
 fs.appendFileSync('boot.log', `[${new Date().toISOString()}] Servidor escuchando en puerto ${port}\n`);
 console.log(`Servidor corriendo en el puerto ${port}`);
});