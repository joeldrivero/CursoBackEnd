const products = require("../products/controller.products")
const carts = require("../carts/controller.carts")
const views = require("../viewsTemplate/controller.viewsTemplate")
const users = require("../users/controller.users")
const auth = require("../auth/controller.auth")

const routes = (app) => {
    app.use("/", views)
    app.use("/api/products", products)
    app.use("/api/carts", carts)
    app.use("/api/users", users)
    app.use("/api/auth", auth)
    app.use("/", products)
    app.use("/", carts)
}

module.exports = routes