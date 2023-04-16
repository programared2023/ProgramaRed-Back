const nodemailer = require('nodemailer');//! denbo instalar


const { mail, mailRegister, mailBaneo, mailDesbaneo } = require("../templateHtml/subcribe")

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Servidor de correo electrónico de origen
  port: 465, // Puerto de origen seguro
  secure: true, // Usar SSL/TLS
  auth: {
    user: "huntersoporteprueba@gmail.com",//'TU_DIRECCIÓN_DE_CORREO_ELECTRÓNICO_DE_ORIGEN',
    pass: "ekxwcxsujqdfmdue"     //  'TU_CONTRASEÑA_DE_CORREO_ELECTRÓNICO_DE_ORIGEN'
  }
});


function miFuncion(username, email, type) {

  try {
    let envio = transporter.sendMail({
      from: "huntersoporteprueba@gmail.com",
      to: email,
      subject: `${type} ProgramaRed`,
      text: `${type}`,
      html: type === "Suscripcion" ? mail(username) : type === "Baneo"
        ? mailBaneo(username) : type === "Desbaneo"
          ? mailDesbaneo(username)
          : mailRegister(username)
    });
    return envio;
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
    throw error;
  }
}




module.exports = miFuncion;