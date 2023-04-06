require('dotenv').config()

module.exports = {
    port: process.env.PORT,
    adminUser: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
}