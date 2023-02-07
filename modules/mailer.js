const nodemailer = require('nodemailer');
const {response} = require("express");
const confMailer = require('../config/mail');
class Mailer{
    transporter = null;
    constructor() {
        this.init;
    }
    init(){
        //this.transporter.verify().then(console.log).catch(console.error);
    }
    async send(params,attachments = []){
        this.transporter = nodemailer.createTransport({
            host: confMailer.MAIL_HOST,
            port: confMailer.MAIL_HOST,
            auth: {
                user: confMailer.MAIL_USERNAME,
                pass: confMailer.MAIL_PASSWORD,
            },
        });
        let response = {
            status: "success",
            data:null,
            isSended:true
        }
        try {
            response.data = await this.transporter.sendMail({
                from: '"Herandro technologies" <herandro.tech>', // sender address
                to: params.to, // list of receivers
                subject: params.subject, // Subject line
                text:   params.text, // plain text body
                html: "añade aquí la versión html del correo electrónico", // html body
                ... attachments
            })
        }catch (e){
            response.status = "error";
            response.isSended = false;
            response.data = e;
            console.log(e);
        }
        return response;
    }
}
module.exports = new Mailer();
