
require('dotenv').config()

module.exports = {
    serviceMail: process.env.SERVICE_MAIL,
    serviceMailPort: process.env.SERVICE_MAIL_PORT,
    gmailUser: process.env.SERVICE_EMAIL,
    gmailPassword: process.env.SERVICE_PASSWORD
}