const  db = require('../../modules/db')
const User = require('./User')
const {Model, DataTypes} = require("sequelize");
class KnowLedge extends Model{}

KnowLedge.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        title_es: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        title_en: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        icon_path: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        description_en: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        description_es: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        important: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },

    },
    {
        modelName: 'KnowLedge',
        tableName: 'knowledges',
        sequelize: db,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
    }
);
KnowLedge.belongsTo(User,{
    foreignKey: 'user_id'
});
User.hasOne(KnowLedge, {
    foreignKey: 'user_id'
});
module.exports = KnowLedge;
