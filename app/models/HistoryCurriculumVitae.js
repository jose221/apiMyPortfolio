const { DataTypes, Model } = require('sequelize');
const  db = require('../../modules/db')
const User = require('./User');


class HistoryCurriculumVitae extends Model{}
HistoryCurriculumVitae.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        archive_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        path: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        archive_type: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
    },
    {
        modelName: 'HistoryCurriculumVitae',
        tableName: 'history_curriculum_vitae',
        sequelize: db,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
    });
module.exports = HistoryCurriculumVitae;

