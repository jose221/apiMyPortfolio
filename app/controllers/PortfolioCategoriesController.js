const { body, validationResult } = require('express-validator');
const Joi = require('joi');
const Response = require('../../modules/response');
const Service = require("../services/PortfolioCategoriesService");


class PortfolioCategoriesController {
    paramsCreate = Joi.object({
        code: Joi.string().max(255).required(),
        title_es: Joi.string().max(255).required(),
        title_en: Joi.string().max(255).required(),
        description_es: Joi.string().required(),
        description_en: Joi.string().required(),
    });

    paramsUpdate = Joi.object({
        code: Joi.string().max(255).required(),
        title_es: Joi.string().max(255).required(),
        title_en: Joi.string().max(255).required(),
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
            }else{
                return res.status(500).json(Response.error(500, null, "Es necesario agregar el id"))
            }
        }
        catch (e) {
            return res.status(500).json(Response.error(500, e))
        }
    }
}
module.exports = new PortfolioCategoriesController();