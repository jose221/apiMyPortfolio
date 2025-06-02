const herandroAPI = require('../providers/HerandroServicesAPI');
const PermissionService = require("./PermissionService");
const Response = require("../../modules/response"); // Ajusta la ruta según tu estructura

class ToolService {
    current_module = 'tools';
    async translate(token, params = {}){
        try{
            if(! await PermissionService.havePermission({user_id:token.id, module_key: this.current_module, action:'update'})){
                return Response.error(500, null, "No tienes acceso a esta API");
            }
            const response = await herandroAPI.translate(params.language, params.text);
            return Response.success(200,response?.data ?? {});
        }catch (e) {
            return Response.error(500, e)
        }
    }

    async correctorText(token, params = {}){
      try{
          if(! await PermissionService.havePermission({user_id:token.id, module_key: this.current_module, action:'update'})){
              return Response.error(500, null, "No tienes acceso a esta API");
          }
          const response = await herandroAPI.correctorText(params.text);
          return Response.success(200,response?.data ?? {});
        }catch (e){
            return Response.error(500, e)
        }
    }

}
module.exports = new ToolService();