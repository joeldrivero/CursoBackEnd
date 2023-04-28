const products = require("../controllers/controller.products")
const carts = require("../controllers/controller.carts")
const views = require("../controllers/controller.viewsTemplate")
const users = require("../controllers/controller.users")
const auth = require("../controllers/controller.auth")
const mail = require("../controllers/controller.mail")

const routes = (app) => {
    app.use("/mail", mail)
    app.use("/", views)
    app.use("/api/products", products)
    app.use("/api/carts", carts)
    app.use("/api/users", users)
    app.use("/api/auth", auth)
    app.use("/", products)
    app.use("/", carts)
}

module.exports = routes