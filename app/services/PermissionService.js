
const Permission = require('../models/Permission');
const Response = require("../../modules/response");
const User = require("../models/User");
const Module = require("../models/Module");

class PermissionService {


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
            const $permission =await Permission.findOne({
                where: conditions
            });
            return await ($permission) ? true : false;
        }else {
            return false;
        }

    }
}
module.exports = new PermissionService();
