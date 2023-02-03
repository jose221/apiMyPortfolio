const nodemailer = require('nodemailer');
const {response} = require("express");
class Mailer{
    #transporter;
    constructor() {
        this.#init;
    }
    #init(){
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: '',
                pass: '',
            },
        });
        transporter.verify().then(console.log).catch(console.error);
        this.#transporter = transporter;
    }
    async send(attachments = []){
        let response = {
            status: "success",
            data:null,
            isSended:true
        }
        try {
            response.data = await this.#transporter.sendMail({
                from: '"Herandro technologies" <herandro.tech>', // sender address
                to: "email al cual vas a enviar", // list of receivers
                subject: "asunto del correo electrónico", // Subject line
                text: "texto plano del correo", // plain text body
                html: "añade aquí la versión html del correo electrónico", // html body
                attachments: [
                    {
                        filename: 'fb.png',
                        path: './public/images/fb.png',
                        cid: 'fb' //same cid value as in the html img src
                    },
                    {
                        filename: 'ig.png',
                        path: './public/images/ig.png',
                        cid: 'ig' //same cid value as in the html img src
                    },
                ],
            })
        }catch (e){
            response.status = "error";
            response.isSended = false;
            console.log(e);
        }
        return response;
    }
}
module.exports = Mailer;
