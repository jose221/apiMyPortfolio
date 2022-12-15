const { body, validationResult } = require('express-validator');
const Joi = require('joi');
const Response = require('../../modules/response');
const ProfessionalExperienceService = require("../services/ProfessionalExperienceService");

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
        image_path: Joi.string().required(),
        user_id: Joi.number().required(),
    });

    paramsUpdate = Joi.object({
        company: Joi.string().max(255).required(),
        job_es: Joi.string().max(255).required(),
        job_en: Joi.string().max(255).required(),
        date_start: Joi.date(),
        date_end: Joi.date(),
        description_es: Joi.string().required(),
        description_en: Joi.string().required(),
        country_es: Joi.string().max(255).required(),
        country_en: Joi.string().max(255).required(),
        image_path: Joi.string().required(),
    });

    async get(req, res, token){
        let item = null;
        try{
            if(req.body.id){
                item = await ProfessionalExperienceService.get(token, req.body);
            }else{
                item = await ProfessionalExperienceService.getAll(token);
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