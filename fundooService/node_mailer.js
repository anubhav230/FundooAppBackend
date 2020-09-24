const nodemailer = require("nodemailer");
require('dotenv').config()

module.exports.mailer = (email, token) => {
    let header = 'http//:localhost:4000/resetPassword/'
    let transporter = nodemailer.createTransport({
        service: 'gmail',

        auth: {
            user: process.env.MAIL,
            pass: process.env.MAIL_PASS
        }
    });
    const link = `<ul><a href = " ${header}${token}:  ">link</a></ul>`
    let mailOption = {
            from: process.env.MAIL, // sender address
            to: email, // list of receivers
            subject: "nodemailer", // Subject line
            html: link + '\nYou are receiving this because you  have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n'
        }
        // send mail with defined transport object
    transporter.sendMail(mailOption, (error, info) => {
        if (error) {
            return console.log(error)
        }
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
}