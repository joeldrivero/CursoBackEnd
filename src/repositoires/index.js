const ProductRepository = require("./Products.repositories")
const Products = require("../dao/factory")
const ProductsMongoDao = require("../dao/mongo/Products.mongo")

const productService = new ProductRepository(new Products)

module.exports = productService