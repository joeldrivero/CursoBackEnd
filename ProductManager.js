const fs = require('fs');
let contador = 0;

class ProductManager {
    constructor(productos = [], path) {
        this.productos = productos;
        this.path = path;
    }

    static id = 0;

    addProducts = (productoNuevo) => {
        let save = {};
        if (!productoNuevo.title || !productoNuevo.description || !productoNuevo.price || !productoNuevo.thumbnail || !productoNuevo.code || !productoNuevo.stock) {
            return console.error("Por favor, complete todos los campos obligatorios");
        }


        if (!fs.existsSync(this.path)) {
            productoNuevo.id = contador;
            save = JSON.stringify(productoNuevo)
        }
        else {
            const prod = this.getProducts();

            if (prod.length > 0) {
                if (prod.find(prod => prod.code === productoNuevo.code)) return console.error("El producto ya existe");
                contador = prod.length - 1;
                productoNuevo.id = contador;
                save = JSON.stringify([...prod, productoNuevo])
            }
            else {
          
                productoNuevo.id = 0;
                save = JSON.stringify([productoNuevo])
            }
        }
        fs.writeFileSync(this.path, save);
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

productos.addProducts({
    title: "“producto prueba”",
    description: "”Este es un producto prueba”",
    price: 200,
    thumbnail: "”Sin imagen”",
    code: "”abc123”",
    stock: 25
})
