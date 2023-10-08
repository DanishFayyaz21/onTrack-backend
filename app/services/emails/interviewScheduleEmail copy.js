"use strict";
import nodemailer from "nodemailer"

export const interview = async (data) => {
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
            to: "tad.johnston51@ethereal.email", // list of receivers
            subject: `Interview Invitation - ${data.job.jobTitle}`, // Subject line
            text: "Hello world?", // plain text body
            html: `<h4>Dear ${data.user.firstName},</h4><br><p>We would like to invite you for an interview for the position of ${data.job.jobTitle} at ${data.job.creator.userProfile.companyName}. We appreciate your interest in our company and are impressed with your qualifications. We believe that your skills and experience align well with what we are seeking for this role.</p><p>Interview Details:<br>Date: ${data.date}<br>Time: ${data.time}<br><br>During the interview, we would like to discuss your background, experience, and qualifications in more detail. Additionally, there will be an opportunity for you to learn more about our company, the team, and the role's responsibilities. Please come prepared to discuss specific examples from your previous work experience that demonstrate your skills and accomplishments.<br><br>If the scheduled date and time are not suitable for you, please let us know as soon as possible so that we can explore alternative options.Please confirm your attendance by ${data.date}/${data.time}, so we can make the necessary arrangements. If you have any questions or require further information, feel free to reach out to ${data.job?.creator?.user?.email}.<br><br>We look forward to meeting you and learning more about your qualifications.<br><br>Best regards,<br><br>${data.job?.creator?.user?.firstName}<br>${data.job.creator.userProfile.companyName}<br>${data.job.creator.user.email}<br>[Phone Number]<br>.</p>`, // html body
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

