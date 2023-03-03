const { DataTypes, Model } = require('sequelize');
const  db = require('../../modules/db')
const User = require('./User');


class DataHerandroEvent extends Model{}
DataHerandroEvent.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    },
    {
        modelName: 'DataHerandroEvent',
        tableName: 'data_herandro_event',
        sequelize: db,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
    });

DataHerandroEvent.belongsTo(User,{
    foreignKey: 'user_id'
});

User.hasMany(DataHerandroEvent, {
    foreignKey: 'user_id'
});
User.hasOne(DataHerandroEvent, {
    foreignKey: 'user_id'
});


module.exports = DataHerandroEvent;

