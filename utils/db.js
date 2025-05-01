// mongoose
const mongoose = require("mongoose")
require("dotenv").config()

const url = process.env.MONGO_DB_URL_ // db server uri
const connectDB = () => mongoose.connect(url)
    .then(() => {
        console.log("mongodb is connected")
    })
    .catch(err => {
        console.log("mongodb Error", err)
    })

module.exports = { connectDB }

