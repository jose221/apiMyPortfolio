const { DataTypes, Model } = require('sequelize');
const  db = require('../../modules/db')
const User = require('./User');


class DataHerandro extends Model{}
DataHerandro.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        uid: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        ip: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        domain: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        path: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    },
    {
        modelName: 'DataHerandro',
        tableName: 'data_herandro',
        sequelize: db,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
    });

DataHerandro.belongsTo(User,{
    foreignKey: 'user_id'
});

User.hasMany(DataHerandro, {
    foreignKey: 'user_id'
});
User.hasOne(DataHerandro, {
    foreignKey: 'user_id'
});


module.exports = DataHerandro;

