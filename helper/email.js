const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const {EMAIL, EMAIL_PASSWORD} = require('../config');

const smtp = nodemailer.createTransport(smtpTransport({
    service: "Gmail",
    auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD
    }
}));

const sendEmail = (receiver, link) => {
    const mailOptions = {
        to: receiver,
        subject: "Please confirm your account",
        html: "Hello,<br> Please Click on the link to verify your account in Edu-Z application.<br><a href="+link+">Click here to verify</a>"
    }
    smtp.sendMail(mailOptions, (err, res) => {
        if (err) {
            console.error(err);
        } else {
            console.log('message sent!');
        }
    });
}

module.exports = sendEmail;