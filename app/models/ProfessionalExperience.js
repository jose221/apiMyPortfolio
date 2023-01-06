const { DataTypes, Model } = require('sequelize');
const  db = require('../../modules/db')
const User = require('./User')
class ProfessionalExperience extends Model{}
ProfessionalExperience.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        company: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        job_es: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        job_en: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        date_start: {
            type: DataTypes.DATE,
            allowNull: true
        },
        date_end: {
            type: DataTypes.DATE,
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
        country_es: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        country_en: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        image_path: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        portfolio: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
    },
    {
        modelName: 'ProfessionalExperience',
        tableName: 'prefessional_experiences',
        sequelize: db,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
    }
);
ProfessionalExperience.belongsTo(User,{
    foreignKey: 'user_id'
});

User.hasMany(ProfessionalExperience, {
    foreignKey: 'user_id'
});
User.hasOne(ProfessionalExperience, {
    foreignKey: 'user_id'
});
module.exports = ProfessionalExperience;
