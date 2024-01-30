import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer';

enum EmailServiceType {
    GMAIL = 'gmail'
}

const fromEmail = process.env.EMAIL;
const password = process.env.EMAIL_PASSWORD

const transporter = nodemailer.createTransport({
    service: EmailServiceType.GMAIL,
    auth: {
        user: fromEmail,
        pass: password
    },
})

export async function sendEmail(content: Mail.Options) {
    const mailOptions = <Mail.Options>{
        from: fromEmail,
        ...content
    }
    transporter.sendMail(mailOptions)
}