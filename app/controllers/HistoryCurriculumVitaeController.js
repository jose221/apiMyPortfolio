const { body, validationResult } = require('express-validator');
const Joi = require('joi');
const Response = require('../../modules/response');
const Service = require("../services/HistoryCurriculumVitaeService");
const UploadFile = require("../../modules/uploadFile");
const UserService = require("../services/UserService");


class StudiesController {
    paramsCreate = Joi.object({
        archive_name: Joi.string().max(255).required(),
        path: Joi.string().max(255),
        archive_type: Joi.string().max(255).required(),
        user_id: Joi.string()
    });

    paramsUpdate = Joi.object({
        archive_name: Joi.string().max(255),
        path: Joi.string().max(255),
        archive_type: Joi.string().max(255),
        user_id: Joi.string()
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
                if(req.files.path) req.body.path = await UploadFile.save("",req.files.path, {module:"history_curriculum_vitae", returnUrl:true, type:'file'} )
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
            if(req.files.path) req.body.path = await UploadFile.save("",req.files.path, {module:"history_curriculum_vitae", returnUrl:true, type:'file'} )
            let user_id = req.body.user_id;
            if(req.body.user_id) delete req.body.user_id;
            item = await Service.create(token, req.body);
            await UserService.update(token, user_id,{
                cv: item.data.id
            })
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