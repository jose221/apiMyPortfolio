var express = require('express');
require('express-group-routes');
const bodyparser = require('body-parser');
const APIAuth = require('./routes/api-auth');
const APIUser = require('./routes/api-user');
const cors = require('cors');
const validateTokenAdmin = require('./app/middlewares/validateTokenAdmin');
var app = express()


app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

 var port = process.env.PORT || 8080
var corsOptions = {
 origin: '*', // Reemplazar con dominio
 optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
const PREFIX_ROUTE = '/api/admin';

//rutas admin
app.use(PREFIX_ROUTE, APIAuth);
app.use(PREFIX_ROUTE,validateTokenAdmin, APIUser);





console.log("http://localhost:"+port)
// iniciamos nuestro servidor
 app.listen(port)

