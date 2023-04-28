const { persistence, user, password, host } = require("../config/app.config")
const mongoose = require("mongoose");


switch (persistence) {
    case "MONGO":
        mongoose.connect(`mongodb+srv://${user}:${password}@${host}/?retryWrites=true&w=majority`, error => {
            if (error) {
                console.log("No se pudo conectar")
                process.exit()
            }
        })
        module.exports = require("../dao/mongo/Products.mongo");
        break
}