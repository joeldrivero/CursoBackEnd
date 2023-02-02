
const ProductManager = require("../ProductManager")
const productos = new ProductManager("./src/products.json")
const { io } = require("socket.io-client")
const { Router } = require("express")
const router = Router();
const socket = io();

router.get("/", getProducts);
router.get("/realtimeproducts", getProductsSocket);
router.get("/:idProduct", getProductsById);
router.post("/", addProduct);
router.put("/:idProduct", updateProduct);
router.delete("/:idProduct", deleteProduct);

async function getProductsSocket(req, res) {

    try {
        let limit = parseInt(req.query.limit);
        const allProductos = await productos.getProducts(limit);
        res.render("realtimeproducts.handlebars", { allProductos });

    } catch (error) {
        return res.status(400).send({ status: "error", error: error })
    }

}

async function getProducts(req, res) {

    try {
        let limit = parseInt(req.query.limit);
        const allProductos = await productos.getProducts(limit);
        res.render("home.handlebars", { allProductos });

    } catch (error) {
        return res.status(400).send({ status: "error", error: error })
    }

}

async function getProductsById(req, res) {
    try {
        let idProduct = req.params.idProduct;
        const allProductos = await productos.getProductsById(idProduct);
        res.status(200).send(allProductos)
    } catch (error) {
        return res.status(400).send({ status: "error", error: error })
    }

}

async function addProduct(req, res) {
    try {
        let product = req.body;
        const allProductos = await productos.addProducts(product);
        res.status(201).send({ status: "Producto creado correctamente", mesagge: "Producto creado correctamente" })
    } catch (error) {
        return res.status(400).send({ status: "error", error: error })
    }

}

async function updateProduct(req, res) {
    try {
        let product = req.body;
        let idProduct = req.params.idProduct;
        const updateProducto = await productos.updateProduct(product, idProduct);
        res.status(200).send({ status: "Producto actualizado correctamente", mesagge: "Producto actualizado correctamente" })
    } catch (error) {
        return res.status(400).send({ status: "error", error: error })
    }


}

async function deleteProduct(req, res) {
    try {
        let idProduct = req.params.idProduct;
        const updateProducto = await productos.deleteProduct(idProduct);
        res.status(200).send({ status: "Producto eliminado correctamente", mesagge: "Producto eliminado correctamente" })
    } catch (error) {
        return res.status(400).send({ status: "error", error: error })
    }

}

module.exports = router;