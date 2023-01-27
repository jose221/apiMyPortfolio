const { DataTypes, Model } = require('sequelize');
const  db = require('../../modules/db')
const User = require("./User");

class PortfolioCategory extends Model{}
PortfolioCategory.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        code: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        title_es: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        title_en: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        description_es: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        description_en: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
    },
    {
        modelName: 'PortfolioCategory',
        tableName: 'portfolio_categories',
        sequelize: db,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
    }
);
PortfolioCategory.belongsTo(User,{
    foreignKey: 'user_id'
});

User.hasMany(PortfolioCategory, {
    foreignKey: 'user_id'
});
User.hasOne(PortfolioCategory, {
    foreignKey: 'user_id'
});


module.exports = PortfolioCategory;
