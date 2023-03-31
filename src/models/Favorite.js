const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Favorite', {
    idPost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false
    });
};