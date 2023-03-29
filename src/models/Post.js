const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Post', {
    title:{
          type:DataTypes.STRING,
          allowNull:false,
          set(value) {//SET lo guardo siempre en mayúsculas
          this.setDataValue('name', value.toUpperCase());
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file:{
      type:DataTypes.STRING,
      allowNull:false,
    }
  });
};
