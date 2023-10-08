"use strict";
import nodemailer from "nodemailer"

export const otpEmail = async (data) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        service: "gmail",
        // secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: 'danishfayyaz91@gmail.com',
            pass: 'byqwfogzylntnkav'
        }
    });

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: 'danishfayyaz91@gmail.com', // sender address
            // to: data.user.email, // list of receivers
            to: "opal.schowalter46@ethereal.email", // list of receivers
            subject: `Forgot Password - OTP`, // Subject line
            text: "Hello world?", // plain text body
            html: `<h4>Dear ${data.name},</h4> 
            <p>Your One-Time Password (OTP) is: <strong>${data.OTP_CODE}</strong></p>
            <p>Please use this OTP to proceed with your verification process.</p>
            <p>If you did not request this OTP, please ignore this email.</p>
            <p>Thank you,</p>
            <p>JMS Orgnization</p>`, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        //
        // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
        //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
        //       <https://github.com/forwardemail/preview-email>
        //
    }

    main().catch(console.error);
}

