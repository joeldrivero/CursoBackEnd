const mongoose = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2');
const productCollection = "products"

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: String,
    price: Number,
    status: String,
    stock: Number,
    category: { type: String, index: true },
    thumnails: Array,
    id: String,
    qty: Number
})

productSchema.plugin(mongoosePaginate)
const productModel = mongoose.model(productCollection, productSchema)

module.exports = productModel