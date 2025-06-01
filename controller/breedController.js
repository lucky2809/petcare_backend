
const { breedModule } = require("../models/breedModel");



const getBreedData = async (request, response) => {
    try {
        // const req = request
        const findAllData = await breedModule.find()
        return response.send({ data: findAllData })
    } catch (err) {
        return response.status(400).send({ message: "Somthing Went Wrong...! ", err })
    }
}

const postBreedData = async (request, response) => {
    try {
        const body = request.body
        console.log(body)

        const breedData = new breedModule({
            name: body.name,
            animal: body.animal,
            breed_type: body.breed_type
        })
        await breedData.save()
        return response.send({ message: "data insert succesfully ...!" })

    } catch (err) {
        return response.status(500).send({ message: "Somthing Went Wrong", err })
    }
}

const deleteBreddData = async (request, response) => {
    try {
        const id = request.params.id
        const findData = await breedModule.findByIdAndDelete(id)
        return response.send({ message: `${findData} is detele` })
    } catch (err) {
        return response.status(400).send({ message: "Somthing went wrong ...!" })
    }
}

const updateBreddData = async (request, response) => {
    try {
        const id = request.params.id
        const obj = request.body
        const findData_by_id = await breedModule.findByIdAndUpdate({ _id: id }, obj)
        return response.send({ message: `${findData_by_id} is updated` })
    } catch (err) {
        return response.status(400).send({ message: "Somthing went wrong ...!" })
    }
}

module.exports = { postBreedData, deleteBreddData, updateBreddData,getBreedData }