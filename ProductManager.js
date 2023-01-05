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
            save = JSON.stringify([productoNuevo])
        }
        else {
            const prod = this.getProducts();

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

        fs.writeFileSync(this.path, JSON.stringify(prodArchivo));
    };

    deleteProduct(id) {
        const prodArchivo = this.getProducts();
        const prod = prodArchivo.filter(prod => prod.id != id)
        prod ? fs.writeFileSync(this.path, JSON.stringify(prod)) : console.log("Not Found");
    };
}

const productos = new ProductManager([], "./productos.json");
