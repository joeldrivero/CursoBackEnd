const fs = require('fs');

class ProductManager {
    constructor(productos = [], path) {
        this.productos = productos;
        this.path = path;
    }

    static id = 0;

    addProducts = (productoNuevo) => {
        if (!productoNuevo.title || !productoNuevo.description || !productoNuevo.price || !productoNuevo.thumbnail || !productoNuevo.code || !productoNuevo.stock) {
            return console.error("Por favor, complete todos los campos obligatorios");
        }

        if (this.productos.find(prod => prod.code === productoNuevo.code)) return console.error("El producto ya existe");
        this.productos.push({ title: productoNuevo.title, description: productoNuevo.description, price: productoNuevo.price, thumbnail: productoNuevo.thumbnail, code: productoNuevo.code, stock: productoNuevo.stock, id: ProductManager.id })
        fs.writeFileSync(this.path, JSON.stringify(this.productos));
        ProductManager.id++;
    }

    getProducts() {
        return JSON.parse(fs.readFileSync(this.path, 'utf-8'));
    }

    getProductsById(id) {
        const prodArchivo = this.getProducts();
        const prod = prodArchivo.find(prod => prod.id === id)
        return prod ? prod : console.log("Not Found");

    };

    updateProduct(producto, id) {

        const prodArchivo = this.getProducts();
        const prod = prodArchivo.find(prod => prod.id === id)
        console.log(producto.title)
        console.log(this.productos)

        if (producto.title && prod.title != producto.title) {
            prod.title = producto.title;
        }

        if (producto.description && prod.description != producto.description) {
            prod.description = producto.description;
        }

        if (producto.price && prod.price != producto.price) {
            prod.price = producto.price;
        }

        if (producto.thumbnail && prod.thumbnail != producto.thumbnail) {
            prod.thumbnail = producto.thumbnail;
        }

        if (producto.code && prod.code != producto.code) {
            if (prodArchivo.find(prod => prod.code === producto.code)) return console.error("El producto ya existe");
            prod.code = producto.code;
        }

        if (producto.stock && prod.stock != producto.stock) {
            prod.stock = producto.stock;
        }

        fs.writeFileSync(this.path, JSON.stringify(prodArchivo));
    };

    deleteProduct(id) {
        const prodArchivo = this.getProducts();
        const prod = prodArchivo.filter(prod => prod.id != id)
        prod ? fs.writeFileSync(this.path, JSON.stringify(prod)) : console.log("Not Found");
    };


}

const productos = new ProductManager([], "./productos.json");
