const Cart = require("../src/CartManager")
const cart = new Cart("./src/cart.json")

const { Router } = require("express")

const router = Router();

router.post("/", postCarrito)
router.post("/:idCart/product/:idProduct", agregarProdACarrito)
router.get("/:idCart", getCarrito)

async function postCarrito(req, res) {
    try {
        let carrito = {};
        const carro = await cart.createCart(carrito)
        res.send({ status: "success", message: "Carrito creado correctamente" })
    }
    catch (error) {
        return res.status(400).send({ status: "error", error: error })
    }


}

async function getCarrito(req, res) {

    try {
        let idCart = req.params.idCart;
        const carro = await cart.getCartById(idCart);
        res.send(carro)
    } catch (error) {
        return res.status(400).send({ status: "error", error: error })
    }

}

async function agregarProdACarrito(req, res) {

    try {
        let idCart = req.params.idCart;
        let idProduct = req.params.idProduct;
        const carro = await cart.addProduct(idProduct, idCart);
        res.send({ status: "success", message: "Producto agregado correctamente" })
    } catch (error) {
        return res.status(400).send({ status: "error", error: error })
    }
}

module.exports = router;