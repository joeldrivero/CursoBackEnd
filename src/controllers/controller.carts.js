const cartModel = require("../models/carts.model")
const { Router } = require("express")
const { privateAccess } = require("../middlewares")
const CartsDAO = require("../dao/mongo/Carts.mongo");
const authUserMiddleware = require("../middlewares/authUser");

const router = Router();

router.post("/", async (req, res) => {
    try {
        let products = []
        let result = await CartsDAO.createCart({ products });
        res.json({ status: "success", payload: result })
    } catch (error) {
        return res.status(400).send({ status: "error", error: error })
    }
})

router.post("/:idCart/product/:idProduct", authUserMiddleware, async (req, res) => {

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