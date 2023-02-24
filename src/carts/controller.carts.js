const Cart = require("../CartManager")
const cart = new Cart("./src/cart.json")
const cartModel = require("../models/carts.model")
const { engine } = require("express-handlebars")
const { Router } = require("express")
const productModel = require("../models/products.model")

const router = Router();

router.post("/", async (req, res) => {
    try {
        let products = []
        let result = await cartModel.create({ products });
        res.json({ status: "success", payload: result })
    } catch (error) {
        return res.status(400).send({ status: "error", error: error })
    }
})

router.post("/:idCart/product/:idProduct", async (req, res) => {

    try {
        let idCart = req.params.idCart;
        let idProduct = req.params.idProduct;
        let result = await cartModel.updateOne({ _id: idCart }, { $push: { products: { products: idProduct} } })
        res.json({ status: "success", payload: result })

    } catch (error) {
        return res.status(400).send({ status: "error", error: error })
    }

})

router.delete("/:idCart/product/:idProduct", async (req, res) => {
    try {
        let idCart = req.params.idCart;
        let idProduct = req.params.idProduct;
        let result = await cartModel.updateOne({ _id: idCart }, { $pull: { products: { products: idProduct } } })
        res.json({ status: "success", payload: result })

    } catch (error) {
        return res.status(400).send({ status: "error", error: error })
    }

})

router.delete("/:idCart", async (req, res) => {
    try {
        let idCart = req.params.idCart;
        let getCart = await cartModel.findOne({ _id: idCart })
        getCart.products = []
        let result = await cartModel.updateOne({ _id: idCart }, getCart)
        res.json({ status: "success", payload: result })
    } catch (error) {
        return res.status(400).send({ status: "error", error: error })
    }

})

router.get("/:idCart", async (req, res) => {
    try {
        let idCart = req.params.idCart;
        const cart = await cartModel.findOne({ _id: idCart })
        res.json({ result: "success", payload: cart })
    } catch (error) {
        return res.status(400).send({ status: "error", error: error })
    }
})

router.get("/carts/:idCart", async (req, res) => {
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