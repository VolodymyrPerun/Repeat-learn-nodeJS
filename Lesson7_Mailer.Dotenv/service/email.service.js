const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates')
const path = require('path');
const htmlTemplate = require('../email-templates')
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

const emailTemplates = new EmailTemplates({
    message: null,
    views: {
        root: path.join(process.cwd(), 'email-templates'),
        options: {
            extension: 'ejs'
        }
    },
    juiceResources: {
        preserveImportant: true,
        webResources: {
            relativeTo: path.join(process.cwd(), 'email-templates', 'css')
        }
    }
})

class EmailService {
    sendMail(userMail, action, context) {
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
