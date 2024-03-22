import nodemailer from 'nodemailer'

interface emailInterface {
	email: string
	nombre: string
	token: string
	url: string
}
const forgetPasswordEmail = async (data: emailInterface) => {
	console.log('sending email')
	const { email, nombre, token, url } = data
	var transport = nodemailer.createTransport({
		host: process.env.MAIL_HOST,
		port: 2525,
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASS,
		},
	})
	const info = await transport.sendMail({
		from: 'APV Administrador de pacientes',
		to: email,
		subject: 'Restablece tu contraseña',
		text: 'Restablece tu contraseña',
		html: `<p>Hola ${nombre}, haz solicitado restablecer tu contraseña.</p>
            <p>Sigue el siguiente enlace para generar una nueva contraseña</p>
            <a href="${url}/forget-password/${token}">Recuperar contraseña</a> </p>
            <p>Si tu no fuiste tú el que realizó esta petición, ignora el correo</p>
        `,
	})
	console.log('email sended: %s', info.messageId)
}
export default forgetPasswordEmail
