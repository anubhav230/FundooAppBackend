const nodemailer = require("nodemailer");
require('dotenv').config()

module.exports.mailer = (email, token, flag) => {
    console.log(flag)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL,
            pass: process.env.MAIL_PASS
        }
    });
    if (flag == 'registration') {
        const link = `<a href="http://localhost:4000/register/${token}">http://localhost:4000</a>`
        var mailOption = {
            from: process.env.MAIL,
            to: email,
            subject: "nodemailer",
            html: 'Please click on the following link for email verification  ' + link
        }
    }

    if (flag == 'forgotPassword') {
        const link = `<a href="http://localhost:4000/resetPassword/${token}">http://localhost:4000</a>`
        var mailOption = {
            from: process.env.MAIL,
            to: email,
            subject: "nodemailer",
            html: 'Please click on the following link for reset password   ' + link
        }
    }




    transporter.sendMail(mailOption, (error, info) => {
        if (error) {
            return console.log(error)
        }
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
}