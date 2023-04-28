const mongoose = require("mongoose")
const ticketCollection = "ticket"


const ticketSchema = new mongoose.Schema({
    code: String,
    purchase_datatime: Date,
    amount: Number,
    purchaser: String
})

const ticketModel = mongoose.model(ticketCollection, ticketSchema)

module.exports = ticketModel