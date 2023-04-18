const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("Report", {
        username: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, { updatedAt: false })
}