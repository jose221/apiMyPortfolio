const { DataTypes, Model } = require('sequelize');
const  db = require('../../modules/db')
const User = require('./User');

class PersonalProject extends Model{}

PersonalProject.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        name_es: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        name_en: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        date_upload: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        link: {
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
        image_path: {
            type: DataTypes.STRING(255),
            allowNull: true
        },

    },
    {
        modelName: 'PersonalProject',
        tableName: 'personal_projects',
        sequelize: db,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
    }
);
PersonalProject.belongsTo(User,{
    foreignKey: 'user_id'
});
User.hasOne(PersonalProject, {
    foreignKey: 'user_id'
});
module.exports = PersonalProject;
