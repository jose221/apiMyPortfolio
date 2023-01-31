
const Response = require("../../modules/response");
const model = require("../models/Permission");
const DBHelper = require("../helpers/DBHelper");
const User = require("../models/User");
const Module = require("../models/Module");
class PermissionService {

    exclude = ['deleted_at', 'created_at', 'updated_at'];
    excludePost = ['deleted_at', 'created_at', 'updated_at', 'id'];
    current_module = 'permissions';

    async getAll(token){
        if(! await this.havePermission({user_id:token.id, module_key:this.current_module, action:'read'})){
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
        if(!await this.havePermission({user_id: token.id, module_key: this.current_module, action:'read'})){
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
            }else{
                return Response.error(500, null, "Es necesaría un id")
            }
        }catch (e){
            return Response.error(500, e);
        }
    }

    async update(token, id, req){
        if(! await this.havePermission({user_id:token.id, module_key: this.current_module, action:'update'})){
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
        if(! await this.havePermission({user_id:token.id, module_key: this.current_module, action:'create'})){
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
        if(! await this.havePermission({user_id:token.id, module_key:'users', action:'delete'})){
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
    async havePermission({user_id, module_key, action}){
        let conditions ={};
        if(user_id && module_key && action){
            const  query_user = await User.findOne({
                attributes:['id', 'role_id'],
                where:{id: user_id}
            });
            const query_module = await Module.findOne({
                attributes:['id', 'key'],
                where:{key: module_key}
            });
            if(query_module && query_user){
                conditions = {role_id: query_user.role_id, module_id: query_module.id}
                conditions['can_'+action] = true;
            }else{
                conditions = {role_id: 999, module_id: 999}
            }
            const $permission =await model.findOne({
                where: conditions
            });
            return await ($permission) ? true : false;
        }else {
            return false;
        }

    }
    async isAdministrator(user_id){
        const  query_user = await User.findOne({
            attributes:['id', 'role_id'],
            where:{id: user_id}
        });
        return (query_user.role_id == 1);
    }
}

module.exports = new PermissionService();

