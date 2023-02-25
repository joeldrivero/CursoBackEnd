const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")
const cartCollection = "carts"

const cartSchema = new mongoose.Schema({
    products: {
        type: [{
            products:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
            }
        }], default: []
    }
})

cartSchema.plugin(mongoosePaginate)
const cartModel = mongoose.model(cartCollection, cartSchema)

module.exports = cartModel