const products = require("../products/controller.products")
const carts = require ("../carts/controller.carts")

const routes = (app) =>{
    app.use("/api/products",products)
    app.use("/api/carts",carts)
}

module.exports = routes