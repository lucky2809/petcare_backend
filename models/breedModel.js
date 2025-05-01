const mongoose = require("mongoose")

const BreedSchema = new mongoose.Schema({
    name: { type: String, required: true },
    animal: { type: String, required: true },
    breed_type: { type: String, required: true }
})

const breedModule = mongoose.model("breeds", BreedSchema)

module.exports = { breedModule }