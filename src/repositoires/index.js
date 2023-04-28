const ProductRepository = require("./Products.repositories")
const Products = require("../dao/factory")

const productService = new ProductRepository(Products)

module.exports = productService