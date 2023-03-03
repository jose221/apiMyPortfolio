var express = require('express');
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


const cors = require('cors');
const validateTokenAdmin = require('./app/middlewares/validateTokenAdmin');
var app = express();
var ws = require('express-ws')(app);
var multipart = require('connect-multiparty');
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.set('trust proxy', true);

 var port = process.env.PORT || 8080
var corsOptions = {
 origin: '*', // Reemplazar con dominio
 optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
app.use(multipart());
app.get('/', function(req, res) {
 res.json({ mensaje: '¡Hola Mundo!' })
})
app.get('/test', async function(req, res) {
 const { Sequelize } = require('sequelize');
 const database = require('./config/database');
 let connection = new Sequelize(database.DB_DATABASE, database.DB_USERNAME, database.DB_PASSWORD, {
  host: database.DB_HOST,
  dialect: database.DB_CONNECTION
 });
 try{
  let con = await connection.authenticate();
  res.json({ mensaje: 'Connection has been established successfully.', data:con })
 }
catch (e){
 res.json({ mensaje: 'Unable to connect to the database:' })
}
})
const PREFIX_ROUTE = '/api/admin';
const PREFIX_ROUTE_PUBLIC = '/api';

//rutas admin
app.use(PREFIX_ROUTE, APIAuth);
app.use(PREFIX_ROUTE,validateTokenAdmin, APIUser);
app.use(PREFIX_ROUTE,validateTokenAdmin, APIProfessionaleExperience);
app.use(PREFIX_ROUTE,validateTokenAdmin, APIknowledges);
app.use(PREFIX_ROUTE,validateTokenAdmin, APIKnowledgesAbilities);
app.use(PREFIX_ROUTE,validateTokenAdmin, APIMyContacts);
app.use(PREFIX_ROUTE,validateTokenAdmin, APIPersonalProjects);
app.use(PREFIX_ROUTE,validateTokenAdmin, APIPortfolio);
app.use(PREFIX_ROUTE,validateTokenAdmin, APIPortfolioCategories);
app.use(PREFIX_ROUTE,validateTokenAdmin, APIStudies);
app.use(PREFIX_ROUTE,validateTokenAdmin, APIMessages);
app.use(PREFIX_ROUTE,validateTokenAdmin, APIModules);
app.use(PREFIX_ROUTE,validateTokenAdmin, APIPermissions);
app.use(PREFIX_ROUTE,validateTokenAdmin, ApiHistoryCV);
app.use(PREFIX_ROUTE,validateTokenAdmin, DataHerandroEvent);
app.use(PREFIX_ROUTE,validateTokenAdmin, DataHerandroEventAction);

/******* upload file *****************/
/******* upload file *****************/
app.use(PREFIX_ROUTE,validateTokenAdmin, APIUploadFile);
app.use('/storage', express.static(__dirname + '/public'));


/** api publicas **/
const APIMyPortfolio= require('./routes/portfolio/api-portfolio');
app.use(PREFIX_ROUTE_PUBLIC, APIMyPortfolio);

const HerandroDataController = require("./app/controllers/HerandroDataController");

app.ws('/test-socket', (socket, req) => {
 socket.on('message', (data)=> {
  data  = JSON.parse(data);
  if(!data.id){
   HerandroDataController.init(socket, req, data)
  }else{
   HerandroDataController.action(socket, req, data)
  }
 })
});



// iniciamos nuestro servidor
 app.listen(port)

