const { body, validationResult } = require('express-validator');
const Joi = require('joi');
const Response = require('../../modules/response');
const Service = require("../services/PersonalProjectsService");
const UploadFile = require("../../modules/uploadFile");
const UserService = require("../services/UserService");

class PersonalProjectsController {
    paramsCreate = Joi.object({
        name_es: Joi.string().max(255).required(),
        name_en: Joi.string().max(255).required(),
        date_upload: Joi.string().max(255).required(),
        link: Joi.string().max(255).required(),
        image_path: Joi.string(),
        description_es: Joi.string().required(),
        description_en: Joi.string().required(),
        user_id: Joi.number().required(),
    });

    paramsUpdate = Joi.object({
        name_es: Joi.string().max(255).required(),
        name_en: Joi.string().max(255).required(),
        date_upload: Joi.string().max(255).required(),
        link: Joi.string().max(255).required(),
        image_path: Joi.string(),
        description_es: Joi.string().required(),
        description_en: Joi.string().required(),
    });

    async get(req, res, token){
        let item = null;
        try{
            if(req.body.id){
                item = await Service.get(token, req.body);
            }else{
                item = await Service.getAll(token);
            }

            return res.status(200).json(item);
        }catch (e) {
            return res.status(500).json(Response.error(500, e))
        }

    }

    async update(req, res, token){

        const {error} = this.paramsUpdate.validate(req.body);
        let item = null;
        if (error) {
            return res.status(400).json(Response.error(400, error.details, error.details[0].message))
        }
        try{
            if(req.params.id){
                if(req.files.image_path) req.body.image_path = await UploadFile.save(token,req.files.image_path, {module:"personal_projects", returnUrl:true, type:'image'} )
                item = await Service.update(token, req.params.id, req.body);
                return res.status(200).json(item);
            }else{
                return res.status(500).json(Response.error(500, null, "Es necesario agregar el id"))
            }
        }
        catch (e) {
            return res.status(500).json(Response.error(500, e))
        }
    }

    async create(req, res, token){
        const {error} = this.paramsCreate.validate(req.body);
        let item = null;
        if (error) {
            return res.status(400).json(Response.error(400, error.details, error.details[0].message))
        }
        try{
            if(req.files.image_path) req.body.image_path = await UploadFile.save(token,req.files.image_path, {module:"personal_projects", returnUrl:true, type:'image'} )
            item = await Service.create(token, req.body);
            return res.status(200).json(item);
        }
        catch (e) {
            return res.status(500).json(Response.error(500, e))
        }
    }

    async delete(req, res, token){
        let item = null;
        try{
            if(req.params.id){
                item = await Service.delete(token, req.params.id);
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
module.exports = new PersonalProjectsController();