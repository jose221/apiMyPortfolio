const Response = require('../../modules/response');
const UploadFile = require('../../modules/uploadFile');
class FilesController{
    async add(req, res, token){
        try{
            let file_url = await UploadFile.save(token, req.files, req.body);
            return await res.status(file_url.code).json(file_url);
        }catch (e) {
            return await res.status(500).json(Response.error(500, e))
        }

    }
    async remove(req, res, token){
        try{
            let file_url = await UploadFile.remove(req.body.url, token);
            return await res.status(file_url.code).json(file_url);
        }catch (e) {
            return await res.status(500).json(Response.error(500, e))
        }
    }
}

module.exports = new FilesController();