
const express = require("express");
const handlebars = require("express-handlebars");
const routes = require("./routes");


const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.engine("handlebars", handlebars.engine())
app.use(express.static(__dirname + "/public"))
app.set("views", __dirname + "/views")

routes(app)

module.exports = app

