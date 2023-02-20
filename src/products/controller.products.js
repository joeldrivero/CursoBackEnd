
const ProductManager = require("../ProductManager")
const productos = new ProductManager("./src/products.json")
const { io } = require("socket.io-client")
const { Router } = require("express")
const productModel = require("../models/products.model")
const { v4: uuidv4 } = require('uuid');
const router = Router();
const socket = io();

router.get("/", async (req, res) => {
    try {
        let lim = 10;
        let pag = 1;

        if (req.query.limit) {
            lim = parseInt(req.query.limit);
        }
        if (req.query.page) {
            pag = parseInt(req.query.page);
        }

        const product = await productModel.paginate({}, { limit: lim, page: pag })


        res.json({ result: "success", payload: product })
    } catch (error) {

    }
});

router.get("/products", async (req, res) => {
    try {
        let lim = 10;
        let pag = 1;

        if (req.query.limit) {
            lim = parseInt(req.query.limit);
        }
        if (req.query.page) {
            pag = parseInt(req.query.page);
        }

        const product = await productModel.paginate({}, { limit: 10, page: 1 })
        var allProductos = JSON.parse(JSON.stringify(product.docs))
        res.render("home.handlebars", { allProductos });
    } catch (error) {

    }
});

router.get("/:idProduct", async (req, res) => {
    try {
        let idProduct = req.params.idProduct;
        const product = await productModel.findOne({ _id: idProduct })
        res.json({ result: "success", payload: product })
    } catch (error) {

    }
});

router.post("/", async (req, res) => {

    let { title, description, code, price, status, stock, category, thumbnails } = req.body
    try {
        if (!title || !description || !price || !code || !stock || !category)
            return res.sent({ status: "error", error: "Por favor complete los campos obligatorios" })

        let result = await productModel.create({
            title, description, code, price, status, stock, category, thumbnails
        })
        res.send({ status: "succes", payload: result })
    }

    catch {

    }
});

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