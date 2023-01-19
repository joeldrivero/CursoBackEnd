const express = require("express");
const routes = require("../routes");
const { router } = require("../routes");

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

 routes(app) 

/*
 app.get("/products", async (req, res) => {

    let limit = parseInt(req.query.limit);

    const allProductos = await productos.getProducts(limit);
    res.send(allProductos)
}
)

app.get("/products/:idProducto", async (req, res) => {

    const allProductos = await productos.getProductsById(parseInt(req.params.idProducto));
    res.send(allProductos)

})

let users = []



app.post("/api/user", (req, res) => {
    let user = req.body;
    if (!user.firstname || !user.lastname) {
        return res.status(400).send({ status: "error", error: "incomplete" })
    }
    users.push(user)
    res.send({ status: "sucess", mesagge: "usuario creado" })
})
 */
app.listen(8080, () => {
    console.log("Servidor iniciado")
})