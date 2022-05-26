const User = require('../models/User');
const PermissionService = require('../services/PermissionService');
const Response = require("../../modules/response");
const DBHelper = require("../helpers/DBHelper")
class UserService{
    exclude = ['remember_token', 'deleted_at', 'created_at', 'updated_at', 'password'];
    excludePost = ['remember_token', 'deleted_at', 'created_at', 'updated_at', 'password', 'id'];

    async getAll(token){
        if(! await PermissionService.havePermission({user_id:token.id, module_key:'USER', action:'read'})){
            return Response.error(500, null, "No tienes acceso a esta API")
        }
        try{
            const res = await User.findAll({attributes: {
                exclude:this.exclude
            }});
            return Response.success(200,res);
        }catch (e){
            return Response.error(500, e)
        }
    }
    async get(token, req){
        console.log(token);
        if(!await PermissionService.havePermission({user_id: token.id, module_key:'USER', action:'read'})){
            return Response.error(500, null, "No tienes acceso a esta API")
        }
        try{
            if(req.id){
                const res = await User.findOne({
                    attributes: {
                        exclude:this.exclude
                    }
                    ,where:{
                        id:req.id
                    }});
                return Response.success(200,res);
            }else{
                return Response.error(500, null, "Es necesaría un id")
            }
        }catch (e){
            return Response.error(500, e);
        }
    }

    async update(token, id, req){
        if(! await PermissionService.havePermission({user_id:token.id, module_key:'USER', action:'update'})){
            return Response.error(500, null, "No tienes acceso a esta API");
        }
        try{
            req = await DBHelper.excludeAttributes(this.excludePost, req);
            const res = await User.update(req, {
                where: {
                    id: id
                }
            });
            if(res)  return Response.success(200,res);
            else return Response.error(500, null, 'No se pudo actualizar, o no existe o ya fue eliminado anteriormente')
        }catch (e){
            return Response.error(500, e)
        }
    }
    async delete(token, id){
        if(! await PermissionService.havePermission({user_id:token.id, module_key:'USER', action:'delete'})){
            return Response.error(500, null, "No tienes acceso a esta API");
        }
        try{
            const res = await User.destroy( {
                where: {
                    id: id
                }
            });
            if(res)return Response.success(200,res);
            else return Response.error(500, null, 'No se pudo eliminar, o no existe o ya fue eliminado anteriormente')
        }catch (e){
            return Response.error(500, e)
        }
    }

}
module.exports = new UserService();

