const { body, validationResult } = require('express-validator');
const Joi = require('joi');
const UserService = require('../services/UserService');
const Response = require('../../modules/response');
const UploadFile = require("../../modules/uploadFile");
const Service = require("../services/StudiesService");
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
        avatar: Joi.string(),
        slogan_es: Joi.string().max(255),
        slogan_en: Joi.string().max(255),
        header_text_es: Joi.string().max(255),
        header_text_en: Joi.string().max(255),
        remember_token: Joi.string(),
        cv: Joi.number(),
        api_token: Joi.string(),
        role_id: Joi.number(),
    });
    paramsUpdate = Joi.object({
        name: Joi.string().max(255),
        age: Joi.number(),
        date_birthday: Joi.date(),
        nationality_es: Joi.string().max(255),
        nationality_en: Joi.string().max(255),
        description_es: Joi.string(),
        description_en: Joi.string(),
        email: Joi.string().max(255).email(),
        country_es: Joi.string().max(255),
        country_en: Joi.string().max(255),
        header_image_path: Joi.string(),
        my_perfil: Joi.string(),
        logo: Joi.string(),
        avatar: Joi.string(),
        api_token: Joi.string(),
        slogan_es: Joi.string(),
        slogan_en: Joi.string(),
        header_text_es: Joi.string().max(255),
        header_text_en: Joi.string().max(255),
        cv: Joi.number(),
        role_id: Joi.number(),
    });

    async get(req, res, token, isAdmin=true){
        //return res.status(200).json(req.get('host'));
        let item = null;
        try{
            if(req.body.id || req.params.id){
                if(req.params.id) req.body.id = req.params.id;
                req.body.id = token.id;
                item = await UserService.get(token, req.body);
            }else{
                if(isAdmin){
                    item = await UserService.getAll(token);
                }else{
                    item = await UserService.get(token, {id: token.id});
                }
            }

            return res.status(200).json(item);
        }catch (e) {
            return res.status(500).json(Response.error(500, e))
        }

    }
    async getByLang(req, res, token, isAdmin=true){
        let item = null;
        try{
            req.body.id = token.id;
            item = await UserService.get(token, req.body);

            item.data.nationality = await item.data[`nationality_${req.params.language}`];
            item.data.description = await item.data[`description_${req.params.language}`];
            item.data.country = await item.data[`country_${req.params.language}`];

            delete item.data[`nationality_${req.params.language}`];
            delete item.data[`description_${req.params.language}`];
            delete item.data[`country_${req.params.language}`];

            return res.status(200).json(item);
        }catch (e) {
            return res.status(500).json(Response.error(500, e))
        }

    }

    async update(req, res, token){
        if(req.body?.HistoryCurriculumVitae) delete req.body?.HistoryCurriculumVitae;
        const {error} = this.paramsUpdate.validate(req.body);
        let item = null;
        if (error) {
            return res.status(400).json(Response.error(400, error.details, error.details[0].message))
        }
        if(req.files.header_image_path) req.body.header_image_path = await UploadFile.save("",req.files.header_image_path, {module:"users", returnUrl:true, type:'image'} )
        if(req.files.my_perfil) req.body.my_perfil = await UploadFile.save("",req.files.my_perfil, {module:"users", returnUrl:true, type:'image'} )
        if(req.files.logo) req.body.logo = await UploadFile.save("",req.files.logo, {module:"users", returnUrl:true, type:'image'} )
        if(req.files.slogan_es) req.body.slogan_es = await UploadFile.save("",req.files.slogan_es, {module:"users", returnUrl:true, type:'image'} )
        if(req.files.slogan_en) req.body.slogan_en = await UploadFile.save("",req.files.slogan_en, {module:"users", returnUrl:true, type:'image'} )
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
            }else if(req.body.ids){
                item = await UserService.delete(token, req.body.ids.split(','));
                return res.status(200).json(item);
            }else{
                return res.status(500).json(Response.error(500, null, "Es necesario agregar el id"))
            }
        }
        catch (e) {
            return res.status(500).json(Response.error(500, e))
        }
    }
    async showUser(req, res, token){
        let item = null;
        if (req.body.cv) {
            return res.status(400).json(Response.error(400, null, "Tienes que agregar el id del curriculum."))
        }
        try{
            if(req.params.id){
                item = await UserService.update(token, req.params.id, req.body);
                return res.status(200).json(item);
            }else{
                return res.status(500).json(Response.error(500, null, "Es necesario agregar el id del usuario"))
            }
        }
        catch (e) {
            return res.status(500).json(Response.error(500, e))
        }
    }

}
module.exports = new UserController();
