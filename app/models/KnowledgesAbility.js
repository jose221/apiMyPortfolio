const  db = require('../../modules/db')
const KnowLedge = require('./KnowLedge')
const {Model, DataTypes} = require("sequelize");
class KnowledgesAbility extends Model{}

KnowledgesAbility.init({
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
        description_en: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        description_es: {
            type: DataTypes.TEXT,
            allowNull: true
        },

    },
    {
        modelName: 'KnowledgesAbility',
        tableName: 'knowledges_abilities',
        sequelize: db,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
    }
);
KnowledgesAbility.belongsTo(KnowLedge,{
    foreignKey: 'knowledges_id'
});
KnowLedge.hasOne(KnowledgesAbility, {
    foreignKey: 'knowledges_id'
});
module.exports = KnowledgesAbility;
