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
        res.json({ result: "success", payload: products })
    } catch (error) {

    }
})

router.post("/:idCart/product/:idProduct", async (req, res) => {

    try {
        let idCart = req.params.idCart;
        let idProduct = req.params.idProduct;

        let getProduct = await productModel.findOne({ _id: idProduct })

        let getCart = await cartModel.findOne({ _id: idCart })
  getCart.products.push({ products: idProduct })
        let result = await cartModel.updateOne({ _id: idCart }, getCart)
        console.log(result)

    } catch (error) {

    }

})

router.delete("/:idCart/product/:idProduct", async (req, res) => {
    try {
        let idCart = req.params.idCart;
        let idProduct = req.params.idProduct;

        let getProduct = await productModel.findOne({ _id: idProduct })

        console.log(getProduct)

        let getCart = await cartModel.findOne({ _id: idCart })

        console.log(getCart.products)

        let products = []

        for (let i = 0; i <= getCart.products.length - 1; i++) {
            if (getCart.products[i].products.toString() != getProduct._id.toString())
                products.push(getCart.products[i])
        }

        getCart.products.push({ products: products })

        let result = await cartModel.updateOne({ _id: idCart }, getCart)
        console.log(result)

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

module.exports = router;