const cartModel = require("../models/carts.model")
const { Router } = require("express")
const { privateAccess } = require("../middlewares")
const CartsDAO = require("../dao/mongo/Carts.mongo");
const authUserMiddleware = require("../middlewares/authUser");
const productModel = require("../models/products.model")
const ticketModel = require("../models/ticket.model")
const { v4: uuidv4 } = require('uuid');

const router = Router();


router.post("/:cid/purchase", async (req, res) => {
    try {
        const cart = await cartModel.findById(req.params.cid).populate("products.products")
        let amount = 0
        for (const item of cart.products) {
            const product = item.products
            const qty = item.qty

            const tieneStock = await productModel.findById(product._id).select("stock")
            if (tieneStock.stock < qty) {
                cart.products = cart.products.filter((p) => p.products._id !== product._id)
            } else {
                await productModel.findByIdAndUpdate(product._id, { $inc: { stock: -qty } })
            }
        }
        for (const product of cart.products) {
            amount += product.products.price * product.qty
        }
        const ticket = new ticketModel({
            code: uuidv4(),
            purchase_datatime: new Date().toISOString(),
            amount: amount,
            purchaser: "req.session.user.email"
        })
        const result = await ticketModel.create(ticket);
        res.status(200).json({ message: "Compra realizada con éxito" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error al procesar la compra" })
    }
})

router.post("/", async (req, res) => {
    try {
        let products = []
        let result = await CartsDAO.createCart({ products });
        res.json({ status: "success", payload: result })
    } catch (error) {
        return res.status(400).send({ status: "error", error: error })
    }
})

router.post("/:idCart/product/:idProduct", /* authUserMiddleware,  */async (req, res) => {

    try {
        const result = await CartsDAO.addToCart(req.params.idCart, req.params.idProduct);
        res.json({ status: "success", payload: result })
    } catch (error) {
        return res.status(400).send({ status: "error", error: error })
    }
})

router.put("/:idCart", async (req, res) => {

    try {
        let idCart = req.params.idCart;
        let array = req.body

        let result = await CartsDAO.updateCart({ _id: idCart }, { $push: { products: { $each: array } } })

        res.json({ status: "success", payload: result })

    } catch (error) {
        return res.status(400).send({ status: "error", error: error })
    }
})


router.put("/:idCart/product/:idProduct", async (req, res) => {

    try {
        const result = await CartsDAO.updateProduct(req.params.idCart, req.params.idProduct, req.body.quantity);
        res.json({ status: "success", payload: result })
    } catch (error) {
        return res.status(400).send({ status: "error", error: error })
    }
})

router.delete("/:idCart/product/:idProduct", authUserMiddleware, async (req, res) => {
    try {
        let result = await CartsDAO.deleteProduct(req.params.idCart, req.params.idProduct)
        res.json({ status: "success", payload: result })
    } catch (error) {
        return res.status(400).send({ status: "error", error: error })
    }
})

router.delete("/:idCart", async (req, res) => {
    try {
        const result = await CartsDAO.deleteCart(idCart)
        res.json({ status: "success", payload: result })
    } catch (error) {
        return res.status(400).send({ status: "error", error: error })
    }
})

router.get("/:idCart", async (req, res) => {
    try {
        let idCart = req.params.idCart;
        const cart = await CartsDAO.getCartById(idCart)
        res.json({ result: "success", payload: cart })
    } catch (error) {
        return res.status(400).send({ status: "error", error: error })
    }
})

router.get("/carts/:idCart", privateAccess, async (req, res) => {
    try {
        let idCart = req.params.idCart;
        const cart = await cartModel.findOne({ _id: idCart }).populate('products.products')
        var allProductos = JSON.parse(JSON.stringify(cart._doc.products))
        res.render("cart.handlebars", { allProductos });

    } catch (error) {
        return res.status(400).send({ status: "error", error: error })
    }
})

module.exports = router;