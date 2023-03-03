const { DataTypes, Model } = require('sequelize');
const  db = require('../../modules/db')
const User = require('./User');
const DataHerandroEvent = require('./DataHerandroEvent');


class DataHerandroEventAction extends Model{}
DataHerandroEventAction.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        value: {
            type: DataTypes.STRING(),
            allowNull: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    },
    {
        modelName: 'DataHerandroEventAction',
        tableName: 'data_herandro_event_action',
        sequelize: db,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
    });

DataHerandroEventAction.belongsTo(User,{
    foreignKey: 'user_id'
});

User.hasMany(DataHerandroEventAction, {
    foreignKey: 'user_id'
});
User.hasOne(DataHerandroEventAction, {
    foreignKey: 'user_id'
});


DataHerandroEventAction.belongsTo(DataHerandroEvent,{
    foreignKey: 'data_herandro_event_id'
});

DataHerandroEvent.hasMany(DataHerandroEventAction, {
    foreignKey: 'data_herandro_event_id'
});
DataHerandroEvent.hasOne(DataHerandroEventAction, {
    foreignKey: 'data_herandro_event_id'
});

module.exports = DataHerandroEventAction;

