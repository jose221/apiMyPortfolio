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


const cors = require('cors');
const validateTokenAdmin = require('./app/middlewares/validateTokenAdmin');
var app = express()
var multipart = require('connect-multiparty');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

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

/******* upload file *****************/
/******* upload file *****************/
app.use(PREFIX_ROUTE,validateTokenAdmin, APIUploadFile);
app.use('/storage', express.static(__dirname + '/public'));


/** api publicas **/
const APIMyPortfolio= require('./routes/portfolio/api-portfolio');
app.use(PREFIX_ROUTE_PUBLIC,validateTokenAdmin, APIMyPortfolio);




// iniciamos nuestro servidor
 app.listen(port)

