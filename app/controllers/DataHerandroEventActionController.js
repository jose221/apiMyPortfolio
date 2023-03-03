const { body, validationResult } = require('express-validator');
const Joi = require('joi');
const Response = require('../../modules/response');
const Service = require("../services/DataHerandroEventActionService");
const UploadFile = require("../../modules/uploadFile");
const UserService = require("../services/UserService");
const MyContactsService = require("../services/MyContactsService");

class DataHerandroEventActionController {
    paramsCreate = Joi.object({
        name: Joi.string().max(255).required(),
        value: Joi.string().required(),
        user_id: Joi.number(),
        data_herandro_event_id: Joi.number()
    });

    paramsUpdate = Joi.object({
        name: Joi.string().max(255),
        value: Joi.string().max(255),
        user_id: Joi.number(),
        data_herandro_event_id: Joi.number()
    });

    async get(req, res, token, isAdmin=true){
        let item = null;
        try{
            if(req.body.id || req.params.id || !isAdmin){
                if(req.params.id) req.body.id = req.params.id;
                req.body.user_id = token.id;
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
module.exports = new DataHerandroEventActionController();
