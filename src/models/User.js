const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: 3, //length mínimo 3
        is: /^[a-zA-Z0-9.-]+$/  //regex solo puede incluir letras, números, guiones y puntos
      },
      set(value) {//SET lo guardo siempre en minúsculas
        this.setDataValue('username', value.toLowerCase());
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: 8, //length mínimo 8
        is: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+=[\]{}|\\,.?:\-<>\/~`]{8,}$/ //Tu contraseña debe incluír al menos una mayúscula y al menos un número
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        len: 11, //length mínimo 11
        is: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ //Debe ser un email con 11 caracteres mínimo,@ y .com
      }
    },
    isPremium: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false
    });
};