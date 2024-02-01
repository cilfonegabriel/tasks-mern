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
        from: '"Tasks -Project Manager" <cuentas@tasks.com>',
        to: email,
        subject: 'Tasks - Check your account',
        text: 'Check your account in Tasks',
        html: `<p>Hi: ${name} Check your account in Tasks</p>
        <p>Your account is almost ready, you just have to confirm in the following link:
        <a href="${process.env.FRONTEND_URL}/confirm/${token}">Check Account</a>
        <p>If you did not create this account you can ignore this message</p>
        
        `,
    })
}

export const emailForgetPassword = async (datos) => {
    const { email, name, token } = datos;

    //TODO: Move to environment variables
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
        from: '"Tasks -Project Manager" <cuentas@tasks.com>',
        to: email,
        subject: 'Tasks - Reset your Password',
        text: 'Reset your Password',
        html: `<p>Hi: ${name} You have requested to reset your password</p>
        <p>Follow the following link to generate a new password:
        <a href="${process.env.FRONTEND_URL}/forget-password/${token}">Reset Password</a>
        <p>If you did not request this email you can ignore this message</p>
        
        `,
    })
}