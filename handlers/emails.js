const nodemailer = require('nodemailer');
const emailConfig = require('../config/emails');
const fs = require('fs');
const util = require('util');
const ejs = require('ejs');


let transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "b01c35ff143019",
    pass: "7c139245b49d1d"
  }
});


exports.enviarEmail = async (opciones) => {
    console.log(opciones);

    //leer el archvio para el email
    const archivo = __dirname + `/../views/emails/${opciones.archivo}.ejs`;
    //compilarlo
    const compilado = ejs.compile(fs.readFileSync(archivo, 'utf8'));

    //crear el html
    const html = compilado({ url: opciones.url });

    //configurar las opciones del email
    const opcionesEmail = {
      from: 'Meeti <noreply@meeti.com>',
      to: opciones.usuario.email,
      subject: opciones.subject,
      text: "HOLA BIEVENIDO",
      html
    }

    console.log("Message sent: %s", opcionesEmail.messageId);
    // enviar email
    const sendEmail = util.promisify(transport.sendMail, transport);
    return sendEmail.call(transport, opcionesEmail);
}