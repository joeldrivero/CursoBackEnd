const { Router } = require("express")
const productModel = require("../models/products.model")
const { privateAccess } = require("../middlewares");
const authMiddleware = require("../middlewares/auth");
const ProductDTO = require("../dao/DTOs/product.dto");
const productService = require("../repositoires/index");
const router = Router();


router.get("/", async (req, res) => {
    try {
        const productList = await productService.getAll(req.query);
        res.json({ result: "Productos obtenidos exitosamente", payload: productList });
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
        res.json({ result: "Producto obtenido exitosamente", payload: product })
    } catch (error) {
        return res.status(400).send({ status: "error", error: error })
    }
});

router.post("/", authMiddleware, async (req, res) => {

    let { title, description, code, price, status, stock, category, thumbnails } = req.body
    const newProduct = new ProductDTO({ title, description, code, price, status, stock, category, thumbnails })

    try {
        if (!title || !description || !price || !code || !stock || !category)
            return res.send({ status: "error", error: "Por favor complete los campos obligatorios" })

        let exist = await productModel.findOne({ code: code })

        if (exist) {
            return res.send({ status: "error", error: "El codigo del producto ya existe" })
        }
        const result = await productService.createProduct(newProduct);
        res.send({ status: "Producto creado exitosamente", payload: result })
    }

    catch {
        return res.status(400).send({ status: "error", error: error })
    }
});

router.put("/:idProduct", authMiddleware, async (req, res) => {
    try {
        let idProduct = req.params.idProduct;
        let { title, description, code, price, status, stock, category, thumbnails } = req.body
        let updateProduct = {};

        if (code) {
            let exist = await productModel.findOne({ code: code })
            if (exist) {
                return res.send({ status: "error", error: "El codigo del producto ya existe" })
            }
            else {
                updateProduct.code = code;
            }
        }

        if (title) {
            updateProduct.title = title;
        }

        if (description) {
            updateProduct.description = description;
        }

        if (price) {
            updateProduct.price = price;
        }

        if (thumbnails) {
            updateProduct.thumbnails = thumbnails;
        }

        if (stock) {
            updateProduct.stock = stock;
        }

        if (category) {
            updateProduct.category = category;
        }

        if (status && typeof status == "boolean") {
            updateProduct.status = status;
        }

        let result = await productService.updateProduct(idProduct, updateProduct);
        res.send({ status: "Producto actualizado", payload: result })
    }
    catch (error) {
        return res.status(400).send({ status: "error", error: error.message })
    }
});

router.delete("/:idProduct", authMiddleware, async (req, res) => {
    try {
        let idProduct = req.params.idProduct;
        const product = await productService.deleteProduct({ idProduct })
        res.json({ result: "success", payload: product })
    } catch (error) {
        return res.status(400).send({ status: "error", error: error })
    }

});



module.exports = router;