const { Router } = require("express")
const productModel = require("../models/products.model")
const { privateAccess } = require("../middlewares")
const router = Router();


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

router.get("/products", privateAccess, async (req, res) => {
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
        const { user } = req.session
        res.render("home.handlebars", { allProductos, user });
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
    const newProduct = { title, description, code, price, status, stock, category, thumbnails }

    try {
        if (!title || !description || !price || !code || !stock || !category)
            return res.send({ status: "error", error: "Por favor complete los campos obligatorios" })

        let exist = await productModel.findOne({ code: code })

        if (exist) {
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

router.put("/:idProduct", async (req, res) => {
    try {
        let idProduct = req.params.idProduct;
        let { title, description, code, price, status, stock, category, thumbnails } = req.body
        const product = await productModel.findOne({ _id: idProduct })
        if (product) {
            if (code) {
                let exist = await productModel.findOne({ code: code })
                if (exist) {
                    return res.send({ status: "error", error: "El codigo del producto ya existe" })
                }
                else {
                    product.code = code;
                }
            }

            if (title) {
                product.title = title;
            }

            if (description) {
                product.description = description;
            }

            if (price) {
                product.price = price;
            }

            if (thumbnails) {
                product.thumnails = thumbnails;
            }

            if (stock) {
                product.stock = stock;
            }

            if (category) {
                product.stock = stock;
            }

            if (status && typeof status == "boolean") {
                product.status = status;
            }

            let result = await productModel.updateOne({ _id: idProduct }, product)
            res.send({ status: "success", payload: result })
        }
        else {
            return res.status(400).send({ status: "error", error: "El Producto no existe" })
        }
    }
    catch (error) { return res.status(400).send({ status: "error", error: error }) }
});

/* router.delete("/:idProduct", async (req, res) => {
    try {
        let idProduct = req.params.idProduct;
        const product = await productModel.findOneAndDelete({ _id: idProduct })
        res.json({ result: "success", payload: product })
    } catch (error) {
        return res.status(400).send({ status: "error", error: error })
    }

});

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
 */
module.exports = router;