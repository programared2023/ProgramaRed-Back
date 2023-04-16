const nodemailer = require('nodemailer');//! denbo instalar


const mail=require("../templateHtml/subcribe")

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Servidor de correo electrónico de origen
    port: 465, // Puerto de origen seguro
    secure: true, // Usar SSL/TLS
    auth: {
        user: "huntersoporteprueba@gmail.com",//'TU_DIRECCIÓN_DE_CORREO_ELECTRÓNICO_DE_ORIGEN',
        pass:  "ekxwcxsujqdfmdue"     //  'TU_CONTRASEÑA_DE_CORREO_ELECTRÓNICO_DE_ORIGEN'
    }
});


 function miFuncion(username,email,type) {  
    if (type==="Suscripcion") correoPersonalizado=mail(username)
    if (type==="Registro") correoPersonalizado=mail(username)
    try {
      let envio =  transporter.sendMail({
        from: "huntersoporteprueba@gmail.com",
        to: email,
        subject: `${type} ProgramaRed`,
        text: `${type}`,
        html: correoPersonalizado
      });
      return envio;
    } catch (error) {
      console.error("Error al enviar el correo electrónico:", error);
      throw error;
    }
  }
  



module.exports =miFuncion;