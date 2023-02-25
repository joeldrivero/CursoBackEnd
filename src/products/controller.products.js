
const ProductManager = require("../ProductManager")
const productos = new ProductManager("./src/products.json")
const { io } = require("socket.io-client")
const { Router } = require("express")
const productModel = require("../models/products.model")
const router = Router();
const socket = io();

router.get("/", async (req, res) => {
    try {
        let lim = 10;
        let pag = 1;

        if (req.query.limit) {
            lim = parseInt(req.query.limit);
        }
        if (req.query.page) {
            pag = parseInt(req.query.page);
        }

        if (req.query.category) {

            if (req.query.sort) {
                const product = await productModel.paginate({ category: req.query.category.toString() }, { limit: lim, page: pag, sort: { price: req.query.sort.toString() } })
                if (product.hasNextPage) {
                    product.nextLink = `http://localhost:8080/api/products?category=${req.query.category}&sort=${req.query.sort}&limit=${lim}&page=${product.nextPage}`
                    if (product.hasPrevPage) {
                        product.prevLink = `http://localhost:8080/api/products?category=${req.query.category}&sort=${req.query.sort}&limit=${lim}&page=${product.prevPage}`
                    }
                    else {
                        product.prevLink = null
                    }
                }
                else {
                    product.nextLink = null
                    if (product.hasPrevPage) {
                        product.prevLink = `http://localhost:8080/api/products?category=${req.query.category}&sort=${req.query.sort}&limit=${lim}&page=${product.prevPage}`
                    }
                    else {
                        product.prevLink = null
                    }
                }
                res.json({ result: "success", payload: product })
            }
            else {
                if (req.query.sort) {
                    const product = await productModel.paginate({ category: req.query.category.toString() }, { limit: lim, page: pag })
                    if (product.hasNextPage) {
                        product.nextLink = `http://localhost:8080/api/products?category=${req.query.category}&limit=${lim}&page=${product.nextPage}`
                        if (product.hasPrevPage) {
                            product.prevLink = `http://localhost:8080/api/products?category=${req.query.category}&limit=${lim}&page=${product.prevPage}`
                        }
                        else {
                            product.prevLink = null
                        }
                    }
                    else {
                        product.nextLink = null
                        if (product.hasPrevPage) {
                            product.prevLink = `http://localhost:8080/api/products?category=${req.query.category}&sort=${req.query.sort}&limit=${lim}&page=${product.prevPage}`
                        }
                        else {
                            product.prevLink = null
                        }
                    }
                    res.json({ result: "success", payload: product })
                }
            }
        }
        else {
            if (req.query.sort) {
                const product = await productModel.paginate({}, { limit: lim, page: pag, sort: { price: req.query.sort.toString() } })
                if (product.hasNextPage) {
                    product.nextLink = `http://localhost:8080/api/products?sort=${req.query.sort}&limit=${lim}&page=${product.nextPage}`
                    if (product.hasPrevPage) {
                        product.prevLink = `http://localhost:8080/api/products?sort=${req.query.sort}&limit=${lim}&page=${product.prevPage}`
                    }
                    else {
                        product.prevLink = null
                    }
                }
                else {
                    product.nextLink = null
                    if (product.hasPrevPage) {
                        product.prevLink = `http://localhost:8080/api/products?sort=${req.query.sort}&limit=${lim}&page=${product.prevPage}`
                    }
                    else {
                        product.prevLink = null
                    }
                }
                res.json({ result: "success", payload: product })
            }
            else {
                const product = await productModel.paginate({}, { limit: lim, page: pag })
                if (product.hasNextPage) {
                    product.nextLink = `http://localhost:8080/api/products?limit=${lim}&page=${product.nextPage}`
                    if (product.hasPrevPage) {
                        product.prevLink = `http://localhost:8080/api/products?limit=${lim}&page=${product.prevPage}`
                    }
                    else {
                        product.prevLink = null
                    }
                }
                else {
                    product.nextLink = null
                    if (product.hasPrevPage) {
                        product.prevLink = `http://localhost:8080/api/products?limit=${lim}&page=${product.prevPage}`
                    }
                    else {
                        product.prevLink = null
                    }
                }
                res.json({ result: "success", payload: product })
            }

        }
    } catch (error) {

    }
});

router.get("/products", async (req, res) => {
    try {
        let lim = 10;
        let pag = 1;

        if (req.query.limit) {
            lim = parseInt(req.query.limit);
        }
        if (req.query.page) {
            pag = parseInt(req.query.page);
        }

        const product = await productModel.paginate({}, { limit: lim, page: pag })

        if (product.hasNextPage) {
            product.nextLink = `http://localhost:8080/products?limit=${lim}&page=${product.nextPage}`
            if (product.hasPrevPage) {
                product.prevLink = `http://localhost:8080/products?limit=${lim}&page=${product.prevPage}`
            }
            else {
                product.prevLink = null
            }
        }
        else {
            product.nextLink = null
            if (product.hasPrevPage) {
                product.prevLink = `http://localhost:8080/products?limit=${lim}&page=${product.prevPage}`
            }
            else {
                product.prevLink = null
            }
        }

        var allProductos = JSON.parse(JSON.stringify(product))
        res.render("home.handlebars", { allProductos });
    } catch (error) {

    }
});

router.get("/:idProduct", async (req, res) => {
    try {
        let idProduct = req.params.idProduct;
        const product = await productModel.findOne({ _id: idProduct })
        res.json({ result: "success", payload: product })
    } catch (error) {
        return res.status(400).send({ status: "error", error: error })
    }
});

router.post("/", async (req, res) => {

    let { title, description, code, price, status, stock, category, thumbnails } = req.body

    try {
        if (!title || !description || !price || !code || !stock || !category)
            return res.send({ status: "error", error: "Por favor complete los campos obligatorios" })

        let exist = await productModel.findOne({ code: code })

        if(exist){
            return res.send({ status: "error", error: "El codigo del producto ya existe" })
        }
        let result = await productModel.create({
            title, description, code, price, status, stock, category, thumbnails
        })
        res.send({ status: "success", payload: result })
    }

    catch {
        return res.status(400).send({ status: "error", error: error })
    }
});

router.put("/:idProduct", updateProduct); //TODO
router.delete("/:idProduct", deleteProduct); //TODO



async function updateProduct(req, res) {
    try {
        let product = req.body;
        let idProduct = req.params.idProduct;
        const updateProducto = await productos.updateProduct(product, idProduct);
        res.status(200).send({ status: "Producto actualizado correctamente", mesagge: "Producto actualizado correctamente" })
    } catch (error) {
        return res.status(400).send({ status: "error", error: error })
    }
}

async function deleteProduct(req, res) {
    try {
        let idProduct = req.params.idProduct;
        const updateProducto = await productos.deleteProduct(idProduct);
        res.status(200).send({ status: "Producto eliminado correctamente", mesagge: "Producto eliminado correctamente" })
    } catch (error) {
        return res.status(400).send({ status: "error", error: error })
    }

}


function linkPage(product) {
    if (product.hasNextPage) {
        product.nextLink = `http://localhost:8080/api/products?category=${req.query.category}&&sort=${req.query.sort}&&limit=${lim}&&page=${pag + 1}`
        if (product.hasPrevPage) {
            product.prevLink = `http://localhost:8080/api/products?category=${req.query.category}&&sort=${req.query.sort}&&limit=${lim}&&page=${pag - 1}`
        }
        else {
            product.prevLink = null
        }
    }
    else {
        product.nextLink = null
        if (product.hasPrevPage) {
            product.prevLink = `http://localhost:8080/api/products?category=${req.query.category}&&sort=${req.query.sort}&&limit=${lim}&&page=${pag - 1}`
        }
        else {
            product.prevLink = null
        }
    }
}
module.exports = router;