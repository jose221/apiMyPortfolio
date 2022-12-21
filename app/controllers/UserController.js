const { body, validationResult } = require('express-validator');
const Joi = require('joi');
const UserService = require('../services/UserService');
const Response = require('../../modules/response');
const UploadFile = require("../../modules/uploadFile");
class UserController {
    paramsCreate = Joi.object({
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
        role_id: Joi.number(),
    });
    paramsUpdate = Joi.object({
        name: Joi.string().max(255).required(),
        age: Joi.number(),
        date_birthday: Joi.date(),
        nationality_es: Joi.string().max(255),
        nationality_en: Joi.string().max(255),
        description_es: Joi.string(),
        description_en: Joi.string(),
        email: Joi.string().max(255).required().email(),
        country_es: Joi.string().max(255),
        country_en: Joi.string().max(255),
        header_image_path: Joi.string(),
        my_perfil: Joi.string(),
        logo: Joi.string(),
        slogan_es: Joi.string(),
        slogan_en: Joi.string(),
        header_text_es: Joi.string().max(255),
        header_text_en: Joi.string().max(255),
        cv: Joi.number(),
        role_id: Joi.number(),
    });

    async get(req, res, token){
        let item = null;
        try{
            if(req.body.id){
                item = await UserService.get(token, req.body);
            }else{
                item = await UserService.getAll(token);
            }

            return res.status(200).json(item);
        }catch (e) {
            return res.status(500).json(Response.error(500, e))
        }

    }

    async update(req, res, token){

        if(req.files.header_image_path) req.body.header_image_path = await UploadFile.save("",req.files.header_image_path, {module:"users", returnUrl:true, type:'image'} )
        if(req.files.my_perfil) req.body.my_perfil = await UploadFile.save("",req.files.my_perfil, {module:"users", returnUrl:true, type:'image'} )
        if(req.files.logo) req.body.logo = await UploadFile.save("",req.files.logo, {module:"users", returnUrl:true, type:'image'} )
        if(req.files.slogan_es) req.body.slogan_es = await UploadFile.save("",req.files.slogan_es, {module:"users", returnUrl:true, type:'image'} )
        if(req.files.slogan_en) req.body.slogan_en = await UploadFile.save("",req.files.slogan_en, {module:"users", returnUrl:true, type:'image'} )

        const {error} = this.paramsUpdate.validate(req.body);
        let item = null;
        if (error) {
            return res.status(400).json(Response.error(400, error.details, error.details[0].message))
        }
        try{
            if(req.params.id){
                item = await UserService.update(token, req.params.id, req.body);
                return res.status(200).json(item);
            }else{
                return res.status(500).json(Response.error(500, null, "Es necesario agregar el id"))
            }
        }
        catch (e) {
            return res.status(500).json(Response.error(500, e))
        }
    }
    async delete(req, res, token){
        let item = null;
        try{
            if(req.params.id){

                item = await UserService.delete(token, req.params.id);
                return res.status(200).json(item);
            }else{
                return res.status(500).json(Response.error(500, null, "Es necesario agregar el id"))
            }
        }
        catch (e) {
            return res.status(500).json(Response.error(500, e))
        }
    }

}
module.exports = new UserController();
