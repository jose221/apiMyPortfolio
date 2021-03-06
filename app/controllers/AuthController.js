const Joi = require('joi');
const AuthService = require('../services/AuthService');
const Response = require('../../modules/response');
class AuthController {
    //validation
    paramsLogin = Joi.object({
        email: Joi.string().max(255).required().email(),
        password: Joi.string().min(6).max(255).required()
    });
    paramsRegister = Joi.object({
        name: Joi.string().max(255).required(),
        age: Joi.number(),
        date_birthday: Joi.date(),
        nationality_es: Joi.string().max(255),
        nationality_en: Joi.string().max(255),
        description_es: Joi.string(),
        description_en: Joi.string(),
        email: Joi.string().max(255).required().email(),
        password: Joi.string().min(6).max(255).required(),
        country_es: Joi.string().max(255),
        country_en: Joi.string().max(255),
        header_image_path: Joi.string().max(255),
        my_perfil: Joi.string().max(255),
        logo: Joi.string().max(255),
        slogan_es: Joi.string().max(255),
        slogan_en: Joi.string().max(255),
        header_text_es: Joi.string().max(255),
        header_text_en: Joi.string().max(255),
        remember_token: Joi.string(),
        cv: Joi.number(),
    });
    async login(req, res){
        //valdation login
        const {error} = this.paramsLogin.validate(req.body);
        if (error) {
            return res.status(400).json(Response.error(400, error.details, error.details[0].message))
        }
        try{
            let item = await AuthService.authLogin(req.body);
            if(item.response != 'error'){
                return res.header('auth-token', item.data.token).json(item);
            }else{
                return res.status(400).json(item)
            }
        }catch (e) {
            return res.status(500).json(Response.error(500, e))
        }

    }
    async register(req, res){
        const {error} = this.paramsRegister.validate(req.body);
        if (error) {
            return res.status(400).json(Response.error(400, error.details, error.details[0].message))
        }
        try{
            let item = await AuthService.authRegister(req.body);
            return res.json(item);
        }catch (e) {
            return res.status(500).json(Response.error(500, e))
        }
    }

    async logout(req, res){
        try{
            const token = req.header('auth-token')
            if(token){
                const item = await AuthService.logout(token);
                return res.status(201).json(item);
            }else{
                return res.status(500).json(Response.error(500, null,'Agregar Token'))
            }
        }catch (e){
            return res.status(500).json(Response.error(500, e))
        }
    }
}
module.exports = new AuthController();
