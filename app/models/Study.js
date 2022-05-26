const { DataTypes, Model } = require('sequelize');
const  db = require('../../modules/db')
const User = require('./User')
class Study extends Model{}
Study.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        caerrer_es: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        caerrer_en: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        school_es: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        school_en: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        folio: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
    },
    {
        modelName: 'Study',
        tableName: 'studies',
        sequelize: db,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
    }
);
Study.belongsTo(User,{
    foreignKey: 'user_id'
});
User.hasOne(Study, {
    foreignKey: 'user_id'
});
module.exports = Study;
