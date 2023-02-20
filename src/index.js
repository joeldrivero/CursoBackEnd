
const express = require("express");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const routes = require("./routes");


const app = express();

app.use(express.json())
mongoose.connect("mongodb+srv://coderUser:coderbackend@backend.0hlxsge.mongodb.net/?retryWrites=true&w=majority", error => {
    if (error) {
        console.log("No se pudo conectar")
        process.exit()
    }
})


app.use(express.urlencoded({ extended: true }))

app.engine("handlebars", handlebars.engine())
app.use(express.static(__dirname + "/public"))
app.set("views", __dirname + "/views")

routes(app)

module.exports = app

