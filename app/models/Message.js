const { DataTypes, Model } = require('sequelize');
const  db = require('../../modules/db')
class Message extends Model{}
Message.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        viewed: {
            type: DataTypes.TINYINT,
            allowNull: true
        },

    },
    {
        modelName: 'Message',
        tableName: 'messages',
        sequelize: db,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
    }
);
module.exports = Message;
