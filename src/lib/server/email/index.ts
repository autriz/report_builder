import nodemailer from "nodemailer";
import { env } from '$env/dynamic/private';

const transporter = nodemailer.createTransport({
  host: "imap.gmail.com",
  port: 993,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

export async function sendRecoverEmail(to: string, subject: string, url: string) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"test" <explayinformer8519@gmail.com>', // sender address
        to, // list of receivers
        subject, // Subject line
        text: `Click here, beatch: ${url}`, // plain text body
        // html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}