const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Rating', {
    vote: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false
    });
};