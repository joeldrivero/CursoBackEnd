class ProductManager {
    constructor(productos = []) {
        this.productos = productos;
    }
    static id = 0;

    addProducts = (title, description, price, thumbnail, code, stock) => {
        if (title == "" || description == "" || price == null || thumbnail == "" || code == "" || stock == null) {
            return console.error("Por favor, complete todos los campos obligatorios");
        }

        if (this.productos.length != 0) {
            for (let i = 0; i < this.productos.length; i++) {
                if (this.productos[i].code == code)
                    return console.error("El producto ya existe");
            }
            this.productos.push({ title: title, description: description, price: price, thumbnail: thumbnail, code: code, stock: stock, id: ProductManager.id })
            ProductManager.id++;
        }
        else {
            this.productos.push({ title: title, description: description, price: price, thumbnail: thumbnail, code: code, stock: stock, id: ProductManager.id })
            ProductManager.id++;
        }

    }

    getProducts() {
        return this.productos;
    }

    getProductsById(id) {
        if (this.productos.length != 0) {
            for (let i = 0; i < this.productos.length; i++) {
                if (this.productos[i].id == id)
                    return this.productos[i];
            }
        }
        return console.error("Not found")
    };


}
