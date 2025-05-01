const express = require("express")
const { postBreedData, deleteBreddData, updateBreddData, getBreedData } = require("../controller/breedController")
const breedRoute = express.Router()


breedRoute.get("/",getBreedData)
breedRoute.post("/post-breed", postBreedData)
breedRoute.delete("/delete-by-id/:id",deleteBreddData)
breedRoute.put("/update-by-id/:id",updateBreddData)


module.exports = { breedRoute }