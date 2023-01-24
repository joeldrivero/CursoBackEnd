const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

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
                    cart.id = uuidv4();
                    cart.products = [];
                    save = JSON.stringify([...c, cart])
                }
                else {
                    cart.id = uuidv4();
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

    async addProduct(idProduct, idCart) {

        try {
            const ProductManager = require("../src/ProductManager")
            const products = new ProductManager("./src/products.json")


            const cart = this.getCartSync()
            const cartIndex = cart.findIndex(carro => carro.id === idCart)
            const findProduct = products.getProductsByIdSync(idProduct)

            if (findProduct == -1) {
                return error = ["El Producto no existe"];
            }

            if (cart[cartIndex].products.length == 0) {
                cart[cartIndex].products = [{ id: idProduct, quantity: 1 }]
            }
            else {
                let prod = cart[cartIndex].products.findIndex(elem => elem.id === idProduct)
                if (prod != -1) {
                    cart[cartIndex].products[prod].quantity += 1;
                }
                else {
                    cart[cartIndex].products = [...cart[cartIndex].products, { id: idProduct, quantity: 1 }]
                }

            };

            fs.promises.writeFile(this.path, JSON.stringify(cart))
        } catch (error) {
            throw error;
        }


    }

}