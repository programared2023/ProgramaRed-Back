const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('User', {
    
  
    username:{
          type:DataTypes.STRING,
          allowNull:false,
          unique:true
      //     set(value) {//SET lo guardo siempre en mayúsculas
      //     this.setDataValue('name', value.toUpperCase());
      // }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   isAlphanumeric: true, 
      //   }
    },
    email:{
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        isEmail: true, 
        }
    },
    birthdate:{
      type:DataTypes.DATEONLY,
      allowNull:false,
      validate: {
        isDate: true, 
        }
    },
  });
};
