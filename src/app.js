const express = require("express");
const routes = require("../routes");
const port = 8080;
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

routes(app)

app.listen(port, () => {
    console.log(`Servidor iniciado en la url http://localhost:8080 puerto ${port}`)
})