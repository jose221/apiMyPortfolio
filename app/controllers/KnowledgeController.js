const { body, validationResult } = require('express-validator');
const Joi = require('joi');
const Response = require('../../modules/response');
const KnowledgeService = require("../services/KnowledgeService");
const UploadFile = require("../../modules/uploadFile");
const UserService = require("../services/UserService");
const MyContactsService = require("../services/MyContactsService");

class KnowledgeController {
    paramsCreate = Joi.object({
        title_es: Joi.string().max(255).required(),
        title_en: Joi.string().max(255).required(),
        icon_path: Joi.string(),
        description_es: Joi.string().required(),
        description_en: Joi.string().required(),
        important: Joi.number(),
        user_id: Joi.number().required(),
    });

    paramsUpdate = Joi.object({
        title_es: Joi.string().max(255),
        title_en: Joi.string().max(255),
        icon_path: Joi.string(),
        description_es: Joi.string(),
        description_en: Joi.string(),
        important: Joi.number(),
        user_id: Joi.number(),
    });

    async get(req, res, token, isAdmin=true){
        let item = null;
        try{
            if(req.body.id || req.params.id || !isAdmin){
                if(req.params.id) req.body.id = req.params.id;
                req.body.user_id = token.id;
                item = await KnowledgeService.get(token, req.body);
            }else{
                item = await KnowledgeService.getAll(token);
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
                if(req.files.icon_path) req.body.icon_path = await UploadFile.save(token,req.files.icon_path, {module:"knowledges", returnUrl:true, type:'image'} )
                item = await KnowledgeService.update(token, req.params.id, req.body);
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
            if(req.files.icon_path) req.body.icon_path = await UploadFile.save(token,req.files.icon_path, {module:"knowledges", returnUrl:true, type:'image'} )
            item = await KnowledgeService.create(token, req.body);
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
                item = await KnowledgeService.delete(token, req.params.id);
                return res.status(200).json(item);
            }else if(req.body.ids){
                item = await KnowledgeService.delete(token, req.body.ids.split(','));
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
module.exports = new KnowledgeController();