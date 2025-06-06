const { body, validationResult } = require('express-validator');
const Joi = require('joi');
const Response = require('../../modules/response');
const Service = require("../services/StudiesService");
const UploadFile = require("../../modules/uploadFile");
const ProfessionalExperienceService = require("../services/ProfessionalExperienceService");


class StudiesController {
    paramsCreate = Joi.object({
        caerrer_es: Joi.string().max(255).required(),
        caerrer_en: Joi.string().max(255).required(),
        school_es: Joi.string().max(255).required(),
        school_en: Joi.string().max(255).required(),
        folio: Joi.string().max(100).required(),
        user_id: Joi.number()
    });

    paramsUpdate = Joi.object({
        caerrer_es: Joi.string().max(255),
        caerrer_en: Joi.string().max(255),
        school_es: Joi.string().max(255),
        school_en: Joi.string().max(255),
        folio: Joi.string().max(100),
        user_id: Joi.number()
    });

    async get(req, res, token){
        let item = null;
        try{
            if(req.body.id || req.params.id){
                if(req.params.id) req.body.id = req.params.id;
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
            }else if(req.body.ids){
                item = await Service.delete(token, req.body.ids.split(','));
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
module.exports = new StudiesController();