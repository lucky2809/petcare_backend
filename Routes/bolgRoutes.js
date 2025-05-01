const express = require("express")
const blogRoute = express.Router()
const { upload_Blogs, getAllBlog } = require("../controller/blogController")

blogRoute.get("/all/", getAllBlog)
blogRoute.post("/upload-bloges/", upload_Blogs)

module.exports = { blogRoute }



