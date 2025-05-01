const bycrypt = require("bcrypt")
const saltRound = 10
const JWT_key = process.env.JWT_SECRIT_KEY
const jwt_ = require("jsonwebtoken")
const { request, response } = require("express")
const { UserModel } = require("../models/usersModel")
const { verify_Token } = require("../auth")


const getAllUsers = async (request, response) => {
    try {
        const data = await UserModel.find()
        return response.send({ data: "Get api is runing...!" })
    } catch (err) {
        response.status(500).send({ massage: "Somthing went wrong ", err })
    }
}

const getAllById = async (request, response) => {
    try {
        const id = request.params.id
        const data = await UserModel.findById({ _id: id })
        return response.send({ User_data: data })

    } catch (err) {
        response.status(500).send({ massage: "Somthing went wrong ...! ", err })
    }
}

const registrationApi = async (request, response) => {
    try {
        const body = request.body
        const password = body.password
        const find_Email = await UserModel.findOne({ email: body.email })

        const objLength = Object.keys(body).length

        if (objLength === 0) {
            return response.status(400).send({ massage: "Empty ... !" })
        }

        if (find_Email) {
            return response.status(400).send({ massage: "Email is Allredy Exsist ... !" })
        }
        if (password.length <= 8) {
            return response.status(400).send({ massage: "Minnimum 8 latter Allowed ... !" })
        }

        const hashPassword = await bycrypt.hash(password, saltRound)

        const data = new UserModel({

            firstname: body.firstname,
            lastname: body.lastname,     
            email: body.email,
            password: hashPassword

        })
        const userData = new UserModel(data)
        console.log(userData)
        await userData.save()
        return response.status(201).send({ massage: "data insert succesfully ... !" })


    } catch (err) {
        return response.status(400).send({ massage: "Somthing Went Wrong ...! " + JSON.stringify(err) })

    }

}

// const postUserData = async (request, response) => {
//     try {
//         const body = request.body
//         const getPassword = body.password
//         console.log("body", body)
//         // const objLength = Object.keys(body).length

//         // if (objLength === 0) {
//         //     return response.status(400).send({ massage: "no body found" })
//         // }

//         const email_And_Username_Find = await UserModel.findOne({ email: body.email })
//         const Username_Find = await UserModel.findOne({ firstname: body.firstname })

//         if (email_And_Username_Find) {
//             return response.status(400).send({ massage: "Email is alredy Exsist ...!" })
//         }

//         if (Username_Find) {
//             return response.status(400).send({ massage: "Username is alredy Exsist ...!" })
//         }

//         if (getPassword.length < 8) {
//             return response.status(400).send({ massage: "Minimum  8 latter allowed ...!" })
//         }

//         const bcryptPassword = await bcrypt.hash(getPassword, saltRound)

//         const user_data = new UserModel({

//             firstname: body.firstname,
//             lastname: body.lastname,
//             email: body.email,
//             password: bcryptPassword
//         })

//         await user_data.save()
//         return response.send({ massage: "data insert succesfully ... !" })

//     } catch (err) {
//         return response.status(400).send({ massage: "Somthing went wrong ... !", err })
//     }
// }

const logIn = async (request, response) => {  // login API 
    try {
        const body = request.body
       
        const find_Data = await UserModel.findOne({ email: body.email })
        const compairPassword = await bycrypt.compare(body.password, find_Data.password)
        
        if (!find_Data) {
            return response.status(400).send({ massage: "Email is not found ... ! ", err })
        }

        if (!compairPassword) {
            return response.status(400).send({ massage: "password is not found ... ! ", err })
        } else {
            const token = jwt_.sign(body, JWT_key, { expiresIn: "1h" })
            response.send({ massage: "log in succesfully ", data: token })
        }

    } catch (err) {
        return response.status(400).send({ massage: "Somthing went wrong ... ! ", err })
    }

}

const tokenVerify = async (request, response) => {
    try {
        const verify = verify_Token(request)
        if (!verify) {
            return response.status(400).send({ massage: "token is not verifyed" })
        } else {
            return response.status(200).send({ massage: "verifird" })
        }
    } catch (err) {
        response.status(400).send({ massage: "token is not found " })
    }
}


module.exports = { getAllById, getAllUsers, logIn, tokenVerify, registrationApi }