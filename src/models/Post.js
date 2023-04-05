const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: 3 //validación de lenght mínimo
      },
      //  set(value) {//SET lo guardo siempre en mayúsculas
      //  this.setDataValue('title', value.charAt(0).toUpperCase() + value.slice(1).toLowerCase());
      // }
    },
    description: {
      type: DataTypes.TEXT, //admite cadenas de texto de más de 255 characters
      allowNull: false,
      validate: {
        len: 3 //validación de lenght mínimo
      },
      set(value) {//SET lo guardo siempre en mayúsculas el primer caracter
        this.setDataValue('description', value.charAt(0).toUpperCase() + value.slice(1));
      }
    },
    files: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    publishDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false
    });
};
