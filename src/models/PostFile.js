const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("PostFile", {
        url: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { timestamps: false, createdAt: false, updatedAt: false })
}