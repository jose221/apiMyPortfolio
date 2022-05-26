const { DataTypes, Model } = require('sequelize');
const  db = require('../../modules/db')
class Role extends Model{}
Role.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        key: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        name_es: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        name_en: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        description_es: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        description_en: {
            type: DataTypes.TEXT,
            allowNull: true
        },

    },
    {
        modelName: 'Role',
        tableName: 'roles',
        sequelize: db,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
    }
);
module.exports = Role;
