const nodemailer = require("nodemailer");
const { errorMonitor } = require("nodemailer/lib/mailer");

module.exports.mailer = (email, tokan) => {
    console.log('/////////////mailer')
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'dulce.ankunding@ethereal.email', // generated ethereal user
            pass: 'f59fNskuzcwbdpnTNV', // generated ethereal password
        },
    });
    console.log('/////////////mailer2')
    let mailOption = {
        from: 'dulce.ankunding@ethereal.email', // sender address
        to: email, // list of receivers
        subject: "Password Reset", // Subject line
        text: "Please copy the following link, to reset your password" + token
    }
    console.log('/////////////mailer3')
        // send mail with defined transport object
    transporter.sendMail(mailOption, (error, info) => {
        console.log('/////////////sendMail')
        if (error) {
            console.log('/////////////sendMail--error')
            return console.log(error)
        }
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });

}