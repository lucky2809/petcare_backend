const express = require("express")
const { getAllUsers, getAllById, postUserData, logIn, tokenVerify, registrationApi } = require("../controller/usersController")
const userRoute = express.Router()

userRoute.get("/", getAllUsers);
userRoute.get("/:id", getAllById);
userRoute.post("/registration-api/",registrationApi)
userRoute.post("/login/",logIn);
userRoute.get("/token",tokenVerify)

module.exports = { userRoute }