const express = require("express");

const ProductManager = require("../ProductManager")
const productos = new ProductManager("./productos.json")

const app = express();
app.use(express.urlencoded({ extended: true }))

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


app.listen(8080, () => {
    console.log("Servidor iniciado")
})
