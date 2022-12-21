const { DataTypes, Model } = require('sequelize');
const  db = require('../../modules/db')
const PortfolioCategory = require("./PortfolioCategory");

class Portfolio extends Model{}
Portfolio.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        icon_path: {
            type: DataTypes.STRING(255),
            allowNull: true
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
        years_experience: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        knowledge_level: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        portfolio_categories_id: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
    },
    {
        modelName: 'Portfolio',
        tableName: 'portfolios',
        sequelize: db,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
        deletedAt: 'deleted_at',
    }
);
Portfolio.belongsTo(PortfolioCategory,{
    foreignKey: 'portfolio_categories_id'
});
PortfolioCategory.hasOne(Portfolio, {
    foreignKey: 'portfolio_categories_id'
});
module.exports = Portfolio;
