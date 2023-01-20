const Cart = require("../src/CartManager")
const cart = new Cart("./src/carrito.json")

const { Router } = require("express")

const router = Router();

router.post("/", postCarrito)
router.post("/:idCarrito/product/:idProduct", agregarProdACarrito)
router.get("/:idCarrito", getCarrito)

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
        let idCarrito = parseInt(req.params.idCarrito);
        const carro = await cart.getCartById(idCarrito);
        res.send(carro)
    } catch (error) {
        return res.status(400).send({ status: "error", error: error })
    }

}

async function agregarProdACarrito(req, res) {

    try {
        let idCarrito = parseInt(req.params.idCarrito);
        let idProduct = parseInt(req.params.idProduct);
        const carro = await cart.agregarProducto(idProduct, idCarrito);
        res.send({ status: "success", message: "Producto agregado correctamente" })
    } catch (error) {
        return res.status(400).send({ status: "error", error: error })
    }
}

module.exports = router;