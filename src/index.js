
const MongoStore = require("connect-mongo");
const express = require("express");
const handlebars = require("express-handlebars");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const initializePassport = require("./config/passport.config");

const routes = require("./routes");
const user = process.env.USER;
const secretKey = process.env.SECRET
const password = process.env.PASSWORD


const app = express();

app.use(express.json())
mongoose.connect(`mongodb+srv://${user}:${password}@backend.0hlxsge.mongodb.net/?retryWrites=true&w=majority`, error => {
    if (error) {
        console.log("No se pudo conectar")
        process.exit()
    }
})

app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${user}:${password}@backend.0hlxsge.mongodb.net/coder-sessions?retryWrites=true&w=majority`,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 15,

    }),
    secret: password, resave: false, saveUninitialized: false
}))
initializePassport()
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }))

app.engine("handlebars", handlebars.engine())
app.use(express.static(__dirname + "/public"))
app.set("views", __dirname + "/views")

routes(app)

module.exports = app

