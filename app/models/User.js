const { DataTypes, Model, Op } = require('sequelize');
const  db = require('../../modules/db')
const HistoryCurriculumVitae = require('./HistoryCurriculumVitae')
const Role = require('./Role')
class User extends Model{}
User.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    date_birthday: {
        type: DataTypes.DATE,
        allowNull: true
    },
    nationality_es: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    nationality_en: {
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
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    email_verified_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    country_es: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    country_en: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    header_image_path: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    my_perfil: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    logo: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    slogan_es: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    slogan_en: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    avatar: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    header_text_es: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    header_text_en: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    remember_token: {
        type: DataTypes.STRING(1000),
        allowNull: true
    },
}, {
    tableName: 'users',
    //timestamps: false,
    paranoid: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    deletedAt: 'deleted_at',
    sequelize:db,
    modelName: 'User',
    scopes:{
        notDeleted: {
            where: {
                deleted_at:{
                    [Op.eq]: null,
                }
            }
        },
    }
});
User.belongsTo(HistoryCurriculumVitae,{
    foreignKey: 'cv'
});
HistoryCurriculumVitae.hasOne(User, {
    foreignKey: 'cv'
});
//role
User.belongsTo(Role,{
    foreignKey: 'role_id'
});
Role.hasOne(User, {
    foreignKey: 'role_id'
});
module.exports = User;

