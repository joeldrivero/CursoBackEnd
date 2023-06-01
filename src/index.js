
const MongoStore = require("connect-mongo");
const express = require("express");
const handlebars = require("express-handlebars");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const swaggerJsDoc = require("swagger-jsdoc");
/* const  __dirname  = require("./utils/index.js") */
const swaggerUiExpress = require("swagger-ui-express");
const initializePassport = require("./config/passport.config");
const routes = require("./routes");
const { user, password, host } = require("./config/app.config");
const addlogger = require("./utils/logger");
const swaggerJSDoc = require("swagger-jsdoc");



const app = express();

app.use(express.json())
mongoose.connect(`mongodb+srv://${user}:${password}@${host}/?retryWrites=true&w=majority`, error => {
    if (error) {
        console.log("No se pudo conectar")
        process.exit()
    }
})

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentacion de API"
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJsDoc(swaggerOptions);

app.use("/apidocs", swaggerUiExpress.serve,swaggerUiExpress.setup(specs))
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
app.use(addlogger)
app.use(express.urlencoded({ extended: true }))

app.engine("handlebars", handlebars.engine())
app.use(express.static(__dirname + "/public"))
app.set("views", __dirname + "/views")

routes(app)

module.exports = app

