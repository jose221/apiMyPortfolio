const Joi = require("joi");
const Response = require("../../modules/response");
const toolService = require("../services/ToolService");

class ToolController {
    paramsCorrectorText = Joi.object({
        text: Joi.string().required(),
    });
    paramsTranslate = Joi.object({
        text: Joi.string().required(),
        language: Joi.string().max(4).required(),
    });

    async correctorText(req, res, token){
        let item = null;
        try{
            const {error} = this.paramsCorrectorText.validate(req.params);
            if (error) {
                return res.status(400).json(Response.error(400, error.details, error.details[0].message))
            }
            item = await toolService.correctorText(token, req.params);

            return res.status(200).json(item);
        }catch (e) {
            return res.status(500).json(Response.error(500, e))
        }
    }

    async translate(req, res, token){
        let item = null;
        try{
            const {error} = this.paramsTranslate.validate(req.params);
            if (error) {
                return res.status(400).json(Response.error(400, error.details, error.details[0].message))
            }
            item = await toolService.translate(token, req.params);

            return res.status(200).json(item);
        }catch (e) {
            return res.status(500).json(Response.error(500, e))
        }
    }
}

module.exports = new ToolController();