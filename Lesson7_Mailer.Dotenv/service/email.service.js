const nodemailer = require('nodemailer');
const {ROOT_EMAIL_LOGIN, ROOT_EMAIL_PASSWORD, ROOT_EMAIL_SERVICE} = require('../config')

const transporter = nodemailer.createTransport({
    service: ROOT_EMAIL_SERVICE,
    // host: 'smpt.el.com'
    port: 387,
    auth: {
        user: ROOT_EMAIL_LOGIN,
        pass: ROOT_EMAIL_PASSWORD
    }
})


class EmailService {
    sendMail(userMail) {
        const mailOptions = {
            from: ROOT_EMAIL_LOGIN,
            to: userMail,
            subject: 'This is a test',
            html: '<p>This is a test</p>'
        }

        return transporter.sendMail(mailOptions)
    }
}

module.exports = new EmailService()
