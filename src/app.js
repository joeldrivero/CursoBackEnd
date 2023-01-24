const express = require("express");
require("dotenv").config()
const routes = require("../routes");
const port = process.env.PORT;
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

routes(app)

app.listen(port, () => {
    console.log(`Servidor iniciado en la url http://localhost:${port} puerto ${port}`)
})