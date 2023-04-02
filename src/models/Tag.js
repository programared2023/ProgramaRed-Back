const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: 2 //validación de lenght mínimo
      },
      set(value) {//SET lo guardo siempre en minúsculas
        this.setDataValue('name', value.toLowerCase());
      }
    }
  },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false
    });
};