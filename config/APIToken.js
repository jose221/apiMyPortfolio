require('dotenv').config();

module.exports = {
    SECRET_TOKEN: process.env.SECRET_TOKEN || 'mysql',
    EXPIRED_MS_TOKEN: process.env.EXPIRED_MS_TOKEN || 86400000,
}
