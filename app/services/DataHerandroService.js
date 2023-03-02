const PermissionService = require("./PermissionService");
const Response = require("../../modules/response");
const model = require("../models/DataHerandro");
const fkModel = require("../models/User");
const DBHelper = require("../helpers/DBHelper");

class DataHerandroService {

    exclude = ['deleted_at', 'created_at', 'updated_at'];
    excludePost = ['deleted_at', 'created_at', 'updated_at', 'id'];
    current_module = 'data_herandro';

    async getAll(token, req={}){
        try{
            const res = await model.findAll({
                include:[{model: fkModel}],
                attributes: {
                    exclude:this.exclude
                },
                where: req
            });
            return Response.success(200,res);
        }catch (e){
            return Response.error(500, e)
        }
    }

    async get(token, req){
        try{
            if(req.id){
                const res = await model.findOne({
                    include:[{model: fkModel}],
                    attributes: {
                        exclude:this.exclude
                    }
                    ,where:req
                });
                return Response.success(200,res);
            }
            else if (req.user_id){
                const res = await model.findAll({
                    include:[{model: fkModel}],
                    attributes: {
                        exclude:this.exclude
                    }
                    ,where:req
                });
                return Response.success(200,res);
            }
            else{
                return Response.error(500, null, "Es necesaría un id")
            }
        }catch (e){
            return Response.error(500, e);
        }
    }

    async update(token, req){
        try{
            req.user_id = token.id
            req = await DBHelper.excludeAttributes(this.excludePost, req);
            const res = await model.update(req, {
                where: {
                    uid: req.uid
                }
            });
            if(res)  return Response.success(200,res);
            else return Response.error(500, null, 'No se pudo actualizar, o no existe o ya fue eliminado anteriormente')
        }catch (e){
            return Response.error(500, e)
        }
    }

    async create(token, req){
        try{
            req.user_id = token.id
            req = await DBHelper.excludeAttributes(this.excludePost, req);
            const res = await model.create(req)
            if(res)  return Response.success(200,res);
            else return Response.error(500, null, 'No se pudo crear')
        }catch (e){
            return Response.error(500, e)
        }
    }

    async delete(token, id){
        if(! await PermissionService.havePermission({user_id:token.id, module_key:this.current_module, action:'delete'})){
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

module.exports = new DataHerandroService();
