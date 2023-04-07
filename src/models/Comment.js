const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Comment', {
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: 2 //validación de lenght mínimo
      },
      set(value) {//SET lo guardo siempre en mayúsculas la primera letra
        this.setDataValue('comment', value.charAt(0).toUpperCase() + value.slice(1));
      }
    }
  },
    {
      timestamps: true,
      createdAt: true,
      updatedAt: false
    });
};