const {v4: uuidv4} = require("uuid");
const fs = require("fs");
const PermissionService = require("../app/services/PermissionService");
const Response = require("./response");

class UploadFile{
    current_module = 'files';
    async save(token, files, opt){
        if(!await PermissionService.havePermission({user_id: token.id, module_key: this.current_module, action:'create'})){
            return {
                code:500,
                message:"No tienes acceso a esta API"
            }
        }
        let path = files.file.path;
        let ultr = opt.module || 'uploads';
        let dir = `${uuidv4()}-${files.file.originalFilename}`;
        let newPath = "./public/"+ultr+"/";
        if(!fs.existsSync(newPath)) fs.mkdirSync(newPath,{recursive:true});

        let url = "/src/"+ultr+"/"+dir;
        let is = fs.createReadStream(path)
        let os = fs.createWriteStream(newPath+dir)

        is.pipe(os)

        is.on('end', function() {
            fs.unlinkSync(path)
        })
        return{
            code:201,
            url:url,
            message:"Se subió el archivo correctamente."
        }

    }
    async remove(url, token){
        if(!await PermissionService.havePermission({user_id: token.id, module_key: this.current_module, action:'delete'})){
            return {
                code:500,
                message:"No tienes acceso a esta API"
            }
        }
        let text = "Se eliminó el archivo correctamente.";
        url = url.replace('/src/', './public/');
        if(fs.existsSync(url)) fs.unlinkSync(url);
        else text = "Archivo no encontrado."
        return{
            code:201,
            url: url,
            message:text
        }
    }
}
module.exports = new UploadFile;