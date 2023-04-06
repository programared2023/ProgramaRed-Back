const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('PaymentInfo', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        productTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('approved', 'rejected', 'cancelled'),
            allowNull: false
        },
    },
        {
            timestamps: false,
            createdAt: false,
            updatedAt: false
        })
}