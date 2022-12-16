var express = require('express');
require('express-group-routes');
const bodyparser = require('body-parser');
const APIAuth = require('./routes/api-auth');
const APIUser = require('./routes/api-user');
const APIProfessionaleExperience = require('./routes/api-professional-experience');
const APIknowledges = require('./routes/api-Knowledge');
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
app.use(PREFIX_ROUTE,validateTokenAdmin, APIProfessionaleExperience);
app.use(PREFIX_ROUTE,validateTokenAdmin, APIknowledges);


//https://stackoverflow.com/questions/16015548/how-to-send-multipart-form-data-request-using-postman
//https://www.cristalab.com/tutoriales/como-subir-archivos-con-express.js-c113231l/

//https://levelup.gitconnected.com/async-js-crash-course-callbacks-promises-async-await-2e5f11b67dc4
//https://programacion.net/articulo/como_subir_un_fichero_mediante_ajax_en_node_js_2111

console.log("http://localhost:"+port)
// iniciamos nuestro servidor
 app.listen(port)

