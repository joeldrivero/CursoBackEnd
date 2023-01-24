const fs = require('fs');
const { v4: uuidv4 } = require('uuid');



module.exports = class ProductManager {

    constructor(path) {
        this.path = path;
    }

    async addProducts(newProduct) {
        try {
            let save = {};
            if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.code || !newProduct.stock || !newProduct.category) {
                return error = "Por favor, complete todos los campos obligatorios";
            }

            if (typeof newProduct.status != "boolean") {
                return error = "Por favor, en el campo status, ingrese true o false";
            }

            if (newProduct.status != false) {
                newProduct.status = true;
            }

            if (!newProduct.thumbnails) {
                newProduct.thumbnails = [];
            }

            if (!fs.existsSync(this.path)) {
                newProduct.id = uuidv4();
                save = JSON.stringify([newProduct])
            }
            else {
                const prod = this.getProductsSync();

                if (prod.length > 0) {
                    if (prod.find(prod => prod.code === newProduct.code)) return console.error("El producto ya existe");
                    newProduct.id = uuidv4();
                    save = JSON.stringify([...prod, newProduct])
                }
                else {
                    newProduct.id = uuidv4();
                    save = JSON.stringify([newProduct])
                }
            }
            await fs.promises.writeFile(this.path, save);
        }
        catch (error) {
            throw error = "Error al agregar el producto";
        }

    }

    async getProducts(limit) {
        try {
            const products = await fs.promises.readFile(this.path, 'utf-8');
            const array = JSON.parse(products)
            return limit ? array.slice(0, limit) : array;
        } catch (error) {
            throw error = "Error los productos";
        }
    }

    getProductsSync() {
        try {
            const products = fs.readFileSync(this.path, 'utf-8');
            const array = JSON.parse(products)
            return array
        } catch (error) {
            throw error = "Error los productos";
        }
    }

    getProductsToCart(id) {

        try {
            const products = this.getProductsSync()
            const prodIndex = products.findIndex(prod => prod.id === id)
            return prodIndex ? prodIndex : { error: "Error: el producto no existe" };
        } catch (error) {
            throw error = "Error al obtener el producto";
        }

    }

    async getProductsById(id) {

        try {
            const products = await this.getProducts()
            const prodIndex = products.find(prod => prod.id === id)
            return prodIndex ? prodIndex : ["Error: el producto no existe"];
        } catch (error) {
            throw error = "Error al obtener el producto";
        }

    }


    getProductsByIdSync(id) {

        try {
            const products = this.getProductsSync()
            const prodIndex = products.findIndex(prod => prod.id === id)
            return prodIndex;
        } catch (error) {
            throw error = "Error al obtener el producto";
        }

    }


    async updateProduct(producto, id) {
        try {
            const prodFs = await this.getProducts();
            const prodIndex = prodFs.findIndex(prod => prod.id === id)
            console.log(prodIndex)


            if (prodIndex === -1)
                return console.error("El producto no existe")

            if (producto.title) {
                prodFs[prodIndex].title = producto.title;
            }

            if (producto.description) {
                prodFs[prodIndex].description = producto.description;
            }

            if (producto.price) {
                prodFs[prodIndex].price = producto.price;
            }

            if (producto.thumbnails) {
                prodFs[prodIndex].thumbnail = producto.thumbnails;
            }

            if (producto.code) {
                prodFs[prodIndex].code = producto.code;
            }

            if (producto.stock) {
                prodFs[prodIndex].stock = producto.stock;
            }

            if (producto.category) {
                prodFs[prodIndex].stock = producto.stock;
            }

            if (producto.status && typeof producto.status == "boolean") {
                prodFs[prodIndex].status = producto.status;
            }

            fs.promises.writeFile(this.path, JSON.stringify(prodFs));
        } catch (error) {
            throw error = "Error al actualizar el producto";
        }


    };


    async deleteProduct(id) {
        try {
            const prodFs = await this.getProducts();
            const prod = prodFs.filter(prod => prod.id != id)
            prod ? fs.promises.writeFile(this.path, JSON.stringify(prod)) : console.log("Not Found");
        } catch (error) {
            throw error = "Error al borrar el producto";
        }
    };
}

