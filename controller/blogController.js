const { blogModel } = require("../models/blogModel")



const getAllBlog = async (request, response) => {
    try {
        const find_Bloges = await blogModel.find()
        // console.log('find_Bloges',JSON.stringify(find_Bloges))
        return  response.status(200).send({ bloges_Data : find_Bloges})
    } catch (err) {
        response.status(400).send({ message: "Something Went Wrong ... !" })
    }
}


const upload_Blogs = async (request, response) => {
    try {
        const body = request.body
        console.log('body', body)

        const objLength = Object.keys(body).length

        if (objLength === 0) {
            return response.status(400).send({ message: "Empty ... !" })
        }

        const bolg_Data = new blogModel({

            image: body.image,
            heading: body.heading,
            description: body.description,
            postData: body.postData

        })

        await bolg_Data.save()
        return response.status(201).send({ message: "data insert succesfully ... !" })


    } catch (err) {
        return response.status(400).send({ message: "Somthing Went Wrong ...! ", err})

    }

}

module.exports = { upload_Blogs,getAllBlog }