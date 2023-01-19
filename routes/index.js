const products = require("../products/controller.products")
const carts = require ("../carts/controller.carts")

const routes = (app) =>{
    app.use("/products",products)
    app.use("/carts",carts)
}

module.exports = routes