const { body, validationResult } = require('express-validator');
const Joi = require('joi');
const Response = require('../../modules/response');
const ProfessionalExperienceService = require("../services/ProfessionalExperienceService");
const KnowledgeService = require("../services/KnowledgeService");
const UploadFile = require("../../modules/uploadFile");
const Service = require("../services/ModulesService");

class ProfessionalExperienceController {
    paramsCreate = Joi.object({
        company: Joi.string().max(255).required(),
        job_es: Joi.string().max(255).required(),
        job_en: Joi.string().max(255).required(),
        date_start: Joi.date(),
        date_end: Joi.date(),
        description_es: Joi.string().required(),
        description_en: Joi.string().required(),
        country_es: Joi.string().max(255).required(),
        country_en: Joi.string().max(255).required(),
        image_path: Joi.string(),
        user_id: Joi.number().required(),
        portfolio: Joi.any().required()
    });

    paramsUpdate = Joi.object({
        company: Joi.string().max(255),
        job_es: Joi.string().max(255),
        job_en: Joi.string().max(255),
        date_start: Joi.date(),
        date_end: Joi.date(),
        description_es: Joi.string(),
        description_en: Joi.string(),
        country_es: Joi.string().max(255),
        country_en: Joi.string().max(255),
        image_path: Joi.string(),
        portfolio: Joi.any()
    });

    async get(req, res, token, isAdmin=true){
        let item = null;
        try{
            if(req.body.id || req.params.id){
                if(req.params.id) req.body.id = req.params.id;
                req.body.user_id = token.id;
                item = await ProfessionalExperienceService.get(token, req.body);
            }else{
                item = await ProfessionalExperienceService.getAll(token);
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
            if(req.files.image_path) req.body.image_path = await UploadFile.save(token,req.files.image_path, {module:"professionalExperiences", returnUrl:true, type:'image'} )
            item = await ProfessionalExperienceService.create(token, req.body);
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
                if(req.files.image_path) req.body.image_path = await UploadFile.save(token,req.files.image_path, {module:"professionalExperiences", returnUrl:true, type:'image'} )
                item = await ProfessionalExperienceService.update(token, req.params.id, req.body);
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
                item = await ProfessionalExperienceService.delete(token, req.params.id);
                return res.status(200).json(item);
            }else if(req.body.ids){
                item = await ProfessionalExperienceService.delete(token, req.body.ids.split(','));
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
module.exports = new ProfessionalExperienceController();
