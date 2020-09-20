const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates')
const path = require('path');

const {ROOT_EMAIL_LOGIN, ROOT_EMAIL_PASSWORD, ROOT_EMAIL_SERVICE, SITE} = require('../config')
const htmlTemplates = require('../email-templates')

const mailTransport = nodemailer.createTransport({
    service: ROOT_EMAIL_SERVICE,
    // // host: 'smpt.el.com'
    // port: 387,
    auth: {
        user: ROOT_EMAIL_LOGIN,
        pass: ROOT_EMAIL_PASSWORD
    }
})

const emailTemplates = new EmailTemplates({
    message: null,
    views: {
        root: path.join(process.cwd(), 'email-templates', 'templates'),
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
});

module.exports = {
    sendMail: async (userMail, action, context) => {
        const template = htmlTemplates[action];
        const html = await emailTemplates.render(template.templateFileName, {...context, SITE});

        const mailOptions = {
            from: ROOT_EMAIL_LOGIN,
            to: userMail,
            subject: template.subject,
            html
        };

        return mailTransport.sendMail(mailOptions)
    },

};

// class EmailService {
//     async sendMail(userMail, action, context) {
//         const template = htmlTemplates[action]
//         const html = await emailTemplates.render(template.templateFileName, {...context})
//         const mailOptions = {
//             from: ROOT_EMAIL_LOGIN,
//             to: userMail,
//             subject: template.subject,
//             html: html
//         }
//
//         return transporter.sendMail(mailOptions)
//     }
// }

// module.exports = new EmailService()
