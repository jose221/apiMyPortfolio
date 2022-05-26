require('dotenv').config();

module.exports = {
    DB_CONNECTION: process.env.DB_CONNECTION || 'mysql',
    DB_HOST: process.env.DB_HOST || '127.0.0.1',
    DB_PORT: process.env.DB_PORT || 3306,
    DB_DATABASE: process.env.DB_DATABASE || 'localhost',
    DB_USERNAME:process.env.DB_USERNAME || 'root',
    DB_PASSWORD:process.env.DB_PASSWORD  || ''
}
