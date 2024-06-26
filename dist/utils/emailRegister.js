import nodemailer from 'nodemailer';
const emailRegister = async (data) => {
    console.log('sending email');
    const { email, nombre, token, url } = data;
    var transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });
    const info = await transport.sendMail({
        from: 'APV Administrador de pacientes',
        to: email,
        subject: 'Comprueba tu cuenta en APV',
        text: 'Comprueba tu cuenta',
        html: `<p>Hola ${nombre}, comprueba tu cuenta en APV.</p>
            <p>Tu cuenta ya está lista, sólo debes comprobarla en el siguiente enlace</p>
            <a href="${url}/confirm/${token}">Comprobar cuenta</a> </p>
            <p>Si tu no creaste esta cuenta, puedes ignorar el email</p>
        `,
    });
    console.log('email sended: %s', info.messageId);
};
export default emailRegister;
