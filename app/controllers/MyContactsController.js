
const Joi = require('joi');
const Response = require('../../modules/response');
const MyContactsService = require("../services/MyContactsService");
const UserService = require("../services/UserService");

class MyContactsController {
    paramsCreate = Joi.object({
        name_es: Joi.string().max(255).required(),
        name_en: Joi.string().max(255).required(),
        url_path: Joi.string().max(255).required(),
        icon_path: Joi.string().max(255).required(),
        user_id: Joi.number().required(),
    });

    paramsUpdate = Joi.object({
        name_es: Joi.string().max(255),
        name_en: Joi.string().max(255),
        url_path: Joi.string().max(255),
        icon_path: Joi.string().max(255),
    });

    async get(req, res, token, isAdmin=true ){
        let item = null;
        try{
            if(req.body.id || req.params.id){
                if(req.params.id) req.body.id = req.params.id;
                req.body.user_id = token.id;
                item = await MyContactsService.get(token, req.body);
            }else{
                item = await MyContactsService.getAll(token);
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
            item = await MyContactsService.create(token, req.body);
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
                item = await MyContactsService.update(token, req.params.id, req.body);
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
                item = await MyContactsService.delete(token, req.params.id);
                return res.status(200).json(item);
            }else if(req.body.ids){
                item = await MyContactsService.delete(token, req.body.ids.split(','));
                return res.status(200).json(item);
            }
            else{
                return res.status(500).json(Response.error(500, null, "Es necesario agregar el id"))
            }
        }
        catch (e) {
            return res.status(500).json(Response.error(500, e))
        }
    }
}
module.exports = new MyContactsController();
