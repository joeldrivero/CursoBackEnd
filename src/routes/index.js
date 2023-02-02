const products = require("../products/controller.products")
const carts = require ("../carts/controller.carts")

const routes = (app) =>{
    app.use("/api/products",products)
    app.use("/api/carts",carts)
    app.use("/",products)
}

module.exports = routes