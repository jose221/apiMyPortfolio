const { body, validationResult } = require('express-validator');
const Joi = require('joi');
const Response = require('../../modules/response');
const KnowledgesAbilitiesService = require("../services/KnowledgesAbilitiesService");
const UploadFile = require("../../modules/uploadFile");
const KnowledgeService = require("../services/KnowledgeService");

class KnowledgesAbilitiesController {
    paramsCreate = Joi.object({
        title_es: Joi.string().max(255).required(),
        title_en: Joi.string().max(255).required(),
        description_es: Joi.string().required(),
        description_en: Joi.string().required(),
        knowledges_id: Joi.number().required(),
    });

    paramsUpdate = Joi.object({
        title_es: Joi.string().max(255),
        title_en: Joi.string().max(255),
        description_es: Joi.string(),
        description_en: Joi.string(),
        knowledges_id: Joi.number(),
    });

    async get(req, res, token){
        let item = null;
        try{
            if(req.body.id || req.params.id){
                if(req.params.id) req.body.id = req.params.id;
                item = await KnowledgesAbilitiesService.get(token, req.body);
            }else{
                item = await KnowledgesAbilitiesService.getAll(token, req.body);
            }

            return res.status(200).json(item);
        }catch (e) {
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
            item = await KnowledgesAbilitiesService.create(token, req.body);
            return res.status(200).json(item);
        }
        catch (e) {
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
                item = await KnowledgesAbilitiesService.update(token, req.params.id, req.body);
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
                item = await KnowledgesAbilitiesService.delete(token, req.params.id);
                return res.status(200).json(item);
            }else if(req.body.ids){
                item = await KnowledgesAbilitiesService.delete(token, req.body.ids.split(','));
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
module.exports = new KnowledgesAbilitiesController();