const mongoose = require("mongoose")
const userCollection = "user"


const userSchema = new mongoose.Schema({
/*     _id: {
        type: mongoose.Schema.Types.Mixed
    }, */
    first_name: String,
    last_name: String,
    age: Number,
    email: { type: String, unique: true },
    password: String
})

const userModel = mongoose.model(userCollection, userSchema)

module.exports = userModel