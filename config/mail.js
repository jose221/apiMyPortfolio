require('dotenv').config();
module.exports = {
    MAIL_HOST: process.env.MAIL_HOST || 'smtp.gmail.com',
    MAIL_PORT: process.env.MAIL_PORT || 587,
    MAIL_USERNAME:process.env.MAIL_USERNAME || 'user@gmail.com',
    MAIL_PASSWORD:process.env.MAIL_PASSWORD  || 'userpassword'
}
