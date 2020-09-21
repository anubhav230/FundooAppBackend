const nodemailer = require("nodemailer");

module.exports.mailer = (email, token) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'dulce.ankunding@ethereal.email', // generated ethereal user
            pass: 'f59fNskuzcwbdpnTNV', // generated ethereal password
        },
    });
    let mailOption = {
            from: 'dulce.ankunding@ethereal.email', // sender address
            to: email, // list of receivers
            subject: "Password Reset", // Subject line
            text: "Please copy the following link, to reset your password" + token
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