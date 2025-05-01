const { request, response } = require("express");
const JWT = require("jsonwebtoken")


const verify_Token = async (request, response) => {
    try {
        const auth = request.headers.authorization
        if (!auth) {
            return response.status(400).send({ massage: "token is invalied" })
        }
        const token = auth.split(" ").pop()
        const jwt_ = JWT.verify(token, process.env.JWT_SECRIT_KEY)

        if (jwt_) {
            return true
        } else {
            return false
        }
    } catch (err) {
        console.log("token is invailed ", err)
    }
}

module.exports = { verify_Token }