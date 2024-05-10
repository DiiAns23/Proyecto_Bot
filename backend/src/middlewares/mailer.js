const nodemailer = require("nodemailer");
require('dotenv').config()

const { EMAIL_HOST, EMAIL_PORT, EMAIL_SECURE, EMAIL, EMAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: EMAIL_SECURE, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD,
    },
});


transporter.verify().then(() => {
    console.log(`Correo electronico conectado desde el puerto ${EMAIL_PORT}`);
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

const enviarCorreo = async(destino, motivo, mensaje, attachmenst = null) => {
    try{
        const datos = {
            from: 'PROYECTO BOT INGENIERIA', // sender address
            to: destino, // list of receivers
            subject: motivo, // Subject line
            html: mensaje, // html body
        }
        const info = await transporter.sendMail(datos);

        console.log(`Correo enviado exitosamente a ${destino}: ${info.messageId}`);
    } catch(error){
        console.log(`Error enviando el correo hacia ${destino}: ${error}`);
        return false;
    }
}

module.exports = enviarCorreo;
