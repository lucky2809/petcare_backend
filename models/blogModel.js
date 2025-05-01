const mongoose = require("mongoose")

const blogModelSchema = new mongoose.Schema({
    image: { type: String, required: true },
    heading: { type: String, required: true },
    description: { type: String, required: true },
    postData :  { type: String }

})

const blogModel = mongoose.model("all_blogs",blogModelSchema)

module.exports = { blogModel }