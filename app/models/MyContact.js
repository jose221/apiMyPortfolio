const { DataTypes, Model } = require('sequelize');
const  db = require('../../modules/db')
const User = require('./User')
class MyContact extends Model{}
MyContact.init({
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
    url_path: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    },
{
    modelName: 'MyContact',
    tableName: 'my_contacts',
    sequelize: db,
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    }
);
MyContact.belongsTo(User,{
    foreignKey: 'user_id'
});
User.hasOne(MyContact, {
    foreignKey: 'user_id'
});
module.exports = MyContact;
