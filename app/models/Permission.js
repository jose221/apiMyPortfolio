const { DataTypes, Model,Sequelize  } = require('sequelize');
const  db = require('../../modules/db')
const Role = require("./Role");
const Module = require("./Module");
const User = require("./User");
const Op = db.Op;
class Permission extends Model{}
Permission.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        can_create: {
            type: DataTypes.BOOLEAN,
            allowNull: true,

        },
        can_read: {
            type: DataTypes.BOOLEAN,
            allowNull: true,

        },
        can_update: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        can_delete: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
    },
    {
        modelName: 'Permission',
        tableName: 'permissions',
        sequelize: db,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
    }
);
//roles foreign
Permission.belongsTo(Role,{
    foreignKey: 'role_id'
});
Role.hasOne(Permission, {
    foreignKey: 'role_id'
});
//modules foreign
Permission.belongsTo(Module,{
    foreignKey: 'module_id'
});
Module.hasMany(Permission, {
    foreignKey: 'module_id'
});
Module.hasOne(Permission, {
    foreignKey: 'module_id'
});
//Permission.havePermission({user_id:1, module_key:'USER', action:'read'}).then(data =>console.log("holaaaa",data));
module.exports = Permission;
