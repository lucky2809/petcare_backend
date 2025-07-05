const bycrypt = require("bcrypt")
const saltRound = 10
const JWT_key = process.env.JWT_SECRET_KEY
const jwt_ = require("jsonwebtoken")
const { request, response } = require("express")
const { UserModel } = require("../models/usersModel")
const { verify_Token } = require("../auth")


const getAllUsers = async (request, response) => {
    try {
        const data = await UserModel.find()
        return response.send({ data: "Get api is runing...!" })
    } catch (err) {
        response.status(500).send({ message: "Somthing went wrong ", err })
    }
}

const getAllById = async (request, response) => {
    try {
        const id = request.params.id
        const data = await UserModel.findById({ _id: id })
        return response.send({ User_data: data })

    } catch (err) {
        response.status(500).send({ message: "Somthing went wrong ...! ", err })
    }
}

const registrationApi = async (request, response) => {
    try {
        const body = request.body
        const password = body.password
        const find_Email = await UserModel.findOne({ email: body.email })

        const objLength = Object.keys(body).length

        if (objLength === 0) {
            return response.status(400).send({ message: "Empty ... !" })
        }

        if (find_Email) {
            return response.status(400).send({ message: "Email is Allredy Exsist ... !" })
        }
        if (password.length <= 8) {
            return response.status(400).send({ message: "Minnimum 8 latter Allowed ... !" })
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
        return response.status(201).send({ message: "data insert succesfully ... !" })


    } catch (err) {
        return response.status(400).send({ message: "Somthing Went Wrong ...! " + JSON.stringify(err) })

    }

}

// const postUserData = async (request, response) => {
//     try {
//         const body = request.body
//         const getPassword = body.password
//         console.log("body", body)
//         // const objLength = Object.keys(body).length

//         // if (objLength === 0) {
//         //     return response.status(400).send({ message: "no body found" })
//         // }

//         const email_And_Username_Find = await UserModel.findOne({ email: body.email })
//         const Username_Find = await UserModel.findOne({ firstname: body.firstname })

//         if (email_And_Username_Find) {
//             return response.status(400).send({ message: "Email is alredy Exsist ...!" })
//         }

//         if (Username_Find) {
//             return response.status(400).send({ message: "Username is alredy Exsist ...!" })
//         }

//         if (getPassword.length < 8) {
//             return response.status(400).send({ message: "Minimum  8 latter allowed ...!" })
//         }

//         const bcryptPassword = await bcrypt.hash(getPassword, saltRound)

//         const user_data = new UserModel({

//             firstname: body.firstname,
//             lastname: body.lastname,
//             email: body.email,
//             password: bcryptPassword
//         })

//         await user_data.save()
//         return response.send({ message: "data insert succesfully ... !" })

//     } catch (err) {
//         return response.status(400).send({ message: "Somthing went wrong ... !", err })
//     }
// }

const logIn = async (request, response) => {  // login API 
    try {
        const body = request.body

        const find_Data = await UserModel.findOne({ email: body.email })
        if (!find_Data) {
            return response.status(400).send({ message: "Email is Incorrect ... ! ", error_type : "email" })
        }
        const compairPassword = await bycrypt.compare(body.password, find_Data.password)


        const { email, role } = find_Data
        if (!compairPassword) {
            return response.status(400).send({ message: "Incorrect Password ! ", error_type : "passNword" })
        } else {
            const token = jwt_.sign({ email, role }, JWT_key, { expiresIn: "1h" })
            response.send({ message: "log in succesfully ", token })
        }

    } catch (err) {
        console.log("err", err)
        return response.status(400).send({ message: "Somthing went wrong ... ! ", err })
    }

}

const tokenVerify = async function (request, response) {
    const auth = request.headers.authorization
    // console.log("auth", auth)
    try {
        if (!auth) {
            return response.status(401).send({ message: "token missing" })

        }
        const token = auth.split(" ").pop()
        // console.log("token", token)
        const isVerify = jwt_.verify(token, process.env.JWT_SECRET_KEY)
        if (isVerify) {
            return response.status(200).send({ message: "verify successful", user_data: isVerify })
        } else {
            return response.status(401).send({ message: "token invalid" })

        }
    }
    catch (err) {
        return response.status(500).send({ message: "token invalid" })


    }
}


module.exports = { getAllById, getAllUsers, logIn, tokenVerify, registrationApi }