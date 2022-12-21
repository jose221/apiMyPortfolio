const {v4: uuidv4} = require("uuid");
const fs = require("fs");
const PermissionService = require("../app/services/PermissionService");
const Response = require("./response");

const tinify = require("tinify");
tinify.key = "dtBm0CNJ59JK5jyr2vvLgP4gyptlRgnD";

class UploadFile{
    current_module = 'files';
    async save(token, file, opt){
        if(token){
            if(!await PermissionService.havePermission({user_id: token.id, module_key: this.current_module, action:'create'})){
                return {
                    code:500,
                    message:"No tienes acceso a esta API"
                }
            }
        }
        let path = file.path;
        let ultr = opt.module || 'uploads';
        let dir = `${uuidv4()}-${file.originalFilename}`;
        let newPath = "./public/"+ultr+"/";


        if(!fs.existsSync(newPath)) fs.mkdirSync(newPath,{recursive:true});

        let url = "/src/"+ultr+"/"+dir;
        if(opt.type == 'image'){
            let source = await tinify.fromFile(path);
            await source.toFile(newPath+dir);
        }else{
            let is = fs.createReadStream(path)
            let os = fs.createWriteStream(newPath+dir)

            is.pipe(os)

            is.on('end', function() {
                fs.unlinkSync(path)
            });
        }

        let res = {
            code:201,
            url:url,
            message:"Se subió el archivo correctamente."
        }
        return (opt.returnUrl) ? res.url : res;

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