const nodemailer = require("nodemailer")
const {
    serviceMail, serviceMailPort, gmailUser, gmailPassword
} = require("../config/gmail.config")

const transport = nodemailer.createTransport({
    service: serviceMail, port: serviceMailPort, auth: {
        user: gmailUser,
        pass: gmailPassword
    }

})

module.exports = transport