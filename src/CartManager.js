const fs = require('fs');
const { stringify } = require('querystring');
let contador = 0;

module.exports = class Cart {
    constructor(path) {
        this.path = path
    }

    async createCart(cart) {
        try {
            let save = {};
            if (!fs.existsSync(this.path)) {
                cart.id = contador;
                cart.products = [];

                save = JSON.stringify([cart])
            }
            else {
                const c = this.getCartSync();

                if (c.length > 0) {
                    contador = c.length;
                    cart.id = contador;
                    cart.products = [];
                    save = JSON.stringify([...c, cart])
                }
                else {
                    cart.id = 0;
                    cart.products = [];
                    save = JSON.stringify([cart])
                }
                await fs.promises.writeFile(this.path, save)
            }
        } catch (error) {
            throw error = "Error al crear el carrito";
        }
    }


    getCartSync() {
        try {
            const cart = fs.readFileSync(this.path, 'utf-8')
            const array = JSON.parse(cart)
            return array
        } catch (error) {
            throw error = "Error al obtener el carrito";
        }
    }


    async getCartById(id) {
        try {
            const cart = await this.getCartSync()
            const cartIndex = cart.find(carro => carro.id === id)
            return cartIndex ? cartIndex : ["Error: el carrito no existe"]

        } catch (error) {
            throw error = "Error al obtener el id del carrito";
        }
    }

    async agregarProducto(idProducto, idCarrito) {

        try {
            const ProductManager = require("../src/ProductManager")
            const productos = new ProductManager("./src/productos.json")


            const carrito = this.getCartSync()
            const cartIndex = carrito.findIndex(carro => carro.id === idCarrito)



            if (carrito[cartIndex].products.length == 0) {
                carrito[cartIndex].products = [{ id: idProducto, quantity: 1 }]
            }
            else {
                let prod = carrito[cartIndex].products.findIndex(elem => elem.id === idProducto)
                if (prod != -1) {
                    carrito[cartIndex].products[prod].quantity += 1;
                }
                else {
                    carrito[cartIndex].products = [...carrito[cartIndex].products, { id: idProducto, quantity: 1 }]
                }

            };


            fs.promises.writeFile(this.path, JSON.stringify(carrito))
        } catch (error) {
            throw error = "Error al agregar el producto al carrito";
        }


    }

}