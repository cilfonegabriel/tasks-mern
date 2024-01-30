import nodemailer from 'nodemailer';

export const emailRegister = async (datos) => {
    const { email, name, token } = datos;

    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "5376fb5db071c5",
          pass: "50815230964e2b"
        }
    });

    //Information of the email
    const info = await transport.sendMail({
        
    })
}