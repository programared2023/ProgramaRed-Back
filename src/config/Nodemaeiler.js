const nodemailer = require('nodemailer');//! denbo instalar


const mail=require("../templateHtml/subcribe")

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Servidor de correo electrónico de origen
    port: 465, // Puerto de origen seguro
    secure: true, // Usar SSL/TLS
    auth: {
        user: "programared2023@gmail.com",//'TU_DIRECCIÓN_DE_CORREO_ELECTRÓNICO_DE_ORIGEN',
        pass:  "qcpoqpbhqklpkfmz"     //  'TU_CONTRASEÑA_DE_CORREO_ELECTRÓNICO_DE_ORIGEN'
    }
});


 function miFuncion(username,email) {  
    correoPersonalizado=mail(username)
    try {
      let envio =  transporter.sendMail({
        from: "fancosegovia@gmail.com",
        to: email,
        subject: "Suscripcón ProgramaRed ",
        text: "Suscripcion",
        html: correoPersonalizado
      });
      return envio;
    } catch (error) {
      console.error("Error al enviar el correo electrónico:", error);
      throw error;
    }
  }
  



module.exports =miFuncion;