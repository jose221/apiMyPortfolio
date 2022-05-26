const { Sequelize } = require('sequelize');
const database = require('../config/database');
class db {
    sequelize = function (){
        let connection = new Sequelize(database.DB_DATABASE, database.DB_USERNAME, database.DB_PASSWORD, {
            host: database.DB_HOST,
            dialect: database.DB_CONNECTION
        });
        connection.authenticate().then(res=>{
            console.log('Connection has been established successfully.');
        }).catch(error=>{
            console.error('Unable to connect to the database:', error);
        });
        return connection;
    };
}
module.exports = new db().sequelize();

