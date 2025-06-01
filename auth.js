const { request, response } = require("express");
const JWT = require("jsonwebtoken")


const verify_Token = async (request, response) => {
    try {
        const auth = request.headers.authorization
        if (!auth) {
            return false
        }
        const token = auth.split(" ").pop()
        const jwt_ = JWT.verify(token, process.env.JWT_SECRET_KEY)

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