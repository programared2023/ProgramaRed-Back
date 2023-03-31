const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // file: { PARA QUE ES ESTO??
    //   type: DataTypes.ENUM('Javascript', 'Vsc', 'Phyton', 'Php', 'Postgresql'),
    //   allowNull: false,
    // }
  },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false
    });
};
