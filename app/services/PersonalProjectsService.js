const PermissionService = require("./PermissionService");
const Response = require("../../modules/response");
const model = require("../models/PersonalProject");
const DBHelper = require("../helpers/DBHelper");

class PersonalProjectsService {

    exclude = ['deleted_at', 'created_at', 'updated_at'];
    excludePost = ['deleted_at', 'created_at', 'updated_at', 'id'];
    current_module = 'personal_projects';

    async getAll(token){
        if(! await PermissionService.havePermission({user_id:token.id, module_key:this.current_module, action:'read'})){
            return Response.error(500, null, "No tienes acceso a esta API")
        }
        try{
            const res = await model.findAll({attributes: {
                    exclude:this.exclude
                }});
            return Response.success(200,res);
        }catch (e){
            return Response.error(500, e)
        }
    }

    async get(token, req){
        if(!await PermissionService.havePermission({user_id: token.id, module_key: this.current_module, action:'read'})){
            return Response.error(500, null, "No tienes acceso a esta API")
        }
        try{
            if(req.id){
                const res = await model.findOne({
                    attributes: {
                        exclude:this.exclude
                    }
                    ,where:{
                        id:req.id
                    }});
                return Response.success(200,res);
            }else if (req.user_id){
                const res = await model.findAll({
                    attributes: {
                        exclude:this.exclude
                    }
                    ,where:{
                        user_id:req.user_id
                        //id:req.user_id
                    }});
                return Response.success(200,res);
            }
            else{
                return Response.error(500, null, "Es necesaría un id")
            }
        }catch (e){
            return Response.error(500, e);
        }
    }

    async update(token, id, req){
        if(! await PermissionService.havePermission({user_id:token.id, module_key: this.current_module, action:'update'})){
            return Response.error(500, null, "No tienes acceso a esta API");
        }
        try{
            req = await DBHelper.excludeAttributes(this.excludePost, req);
            const res = await model.update(req, {
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

    async create(token, req){
        if(! await PermissionService.havePermission({user_id:token.id, module_key: this.current_module, action:'create'})){
            return Response.error(500, null, "No tienes acceso a esta API");
        }
        try{
            req = await DBHelper.excludeAttributes(this.excludePost, req);
            const res = await model.create(req)
            if(res)  return Response.success(200,res);
            else return Response.error(500, null, 'No se pudo crear')
        }catch (e){
            return Response.error(500, e)
        }
    }

    async delete(token, id){
        if(! await PermissionService.havePermission({user_id:token.id, module_key:'users', action:'delete'})){
            return Response.error(500, null, "No tienes acceso a esta API");
        }
        try{
            const res = await model.destroy( {
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

module.exports = new PersonalProjectsService();