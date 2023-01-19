//ACA VA TODOS LOS METODOS
const ProductManager = require("../src/ProductManager")
const productos = new ProductManager("./src/productos.json")
const { Router } = require("express")

const router = Router();

router.get("/", getProducts);
router.get("/:idProducto", getProductsById);
router.post("/", addProduct);

async function getProducts(req, res) {
    let limit = parseInt(req.query.limit);
    const allProductos = await productos.getProducts(limit);
    res.send(allProductos)
}

async function getProductsById(req, res) {
    let idProducto = parseInt(req.params.idProducto);
    const allProductos = await productos.getProductsById(idProducto);
    res.send(allProductos)
}

async function addProduct(req, res) {
    let product = req.body;

    const allProductos = await productos.addProducts(product);
    res.send({ status: "Producto creado correctamente", mesagge: "Producto creado correctamente" })

}

/* router.get("/", async (req, res) => {
    let limit = parseInt(req.query.limit);
    const allProductos = await productos.getProducts(limit);
    res.send(allProductos)
}) */

module.exports = router;