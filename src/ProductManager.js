const fs = require('fs');
let contador = 0;

module.exports = class ProductManager {

    constructor(path) {
        this.path = path;
    }

    static id = 0;

    async addProducts(productoNuevo) {
        try {
            let save = {};
            if (!productoNuevo.title || !productoNuevo.description || !productoNuevo.price || !productoNuevo.thumbnail || !productoNuevo.code || !productoNuevo.stock) {
                return console.error("Por favor, complete todos los campos obligatorios");
            }

            if (!fs.existsSync(this.path)) {
                productoNuevo.id = contador;
                save = JSON.stringify([productoNuevo])
            }
            else {
                const prod = this.getProductsSync();

                if (prod.length > 0) {
                    if (prod.find(prod => prod.code === productoNuevo.code)) return console.error("El producto ya existe");
                    contador = prod.length;
                    productoNuevo.id = contador;
                    save = JSON.stringify([...prod, productoNuevo])
                }
                else {
                    productoNuevo.id = 0;
                    save = JSON.stringify([productoNuevo])
                }
            }
            await fs.promises.writeFile(this.path, save);
        }
        catch (error) {
            throw new Error("Error:", error)
        }

    }

    async getProducts(limit) {
        try {
            const products = await fs.promises.readFile(this.path, 'utf-8');
            const array = JSON.parse(products)
            return limit ? array.slice(0, limit) : array;
        } catch (error) {
            throw new Error("Error:", error)
        }
    }

    getProductsSync() {
        try {
            const products = fs.readFileSync(this.path, 'utf-8');
            const array = JSON.parse(products)
            return array
        } catch (error) {
            throw new Error("Error:", error)
        }
    }



    async getProductsById(id) {

        try {
            const products = await this.getProducts()
            const prodIndex = products.find(prod => prod.id === id)
            return prodIndex ? prodIndex : ["Error: el producto no existe"];
        } catch (error) {
            throw new Error("Error:", error)
        }

    }

    async updateProduct(producto, id) {

        const prodArchivo = await this.getProducts();
        const prodIndex = prodArchivo.findIndex(prod => prod.id === id)
        console.log(prodIndex)


        if (prodIndex === -1)
            return console.error("El producto no existe")

        if (producto.title) {
            prodArchivo[prodIndex].title = producto.title;
        }

        if (producto.description) {
            prodArchivo[prodIndex].description = producto.description;
        }

        if (producto.price) {
            prodArchivo[prodIndex].price = producto.price;
        }

        if (producto.thumbnail) {
            prodArchivo[prodIndex].thumbnail = producto.thumbnail;
        }

        if (producto.code) {
            prodArchivo[prodIndex].code = producto.code;
        }

        if (producto.stock) {
            prodArchivo[prodIndex].stock = producto.stock;
        }

        fs.promises.writeFile(this.path, JSON.stringify(prodArchivo));
    };


    async deleteProduct(id) {
        try {
            const prodArchivo = await this.getProducts();
            const prod = prodArchivo.filter(prod => prod.id != id)
            prod ? fs.promises.writeFile(this.path, JSON.stringify(prod)) : console.log("Not Found");
        } catch (error) {
            throw new Error("Error:", error)
        }
    };

}

