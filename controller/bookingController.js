
const { BookingModel } = require("../models/bookingModel");



const userDetailsApi = async (request, response) => {
    try {
        const { user_id, booking_no, first_name, last_name, email, phone_no, booking_type, address, start_date, end_date } = request.body
        const user = new BookingModel({ user_id, booking_no, first_name, last_name, email, phone_no, booking_type, address, start_date, end_date })
        await user.save()
        response.status(201).json({ message: 'Details save', user })
    }
    catch (err) {
        response.status(400).json({ error: err.message });
    }
}
const getAllBookingDetails = async (request, response) => {
    try {
        const product = await BookingModel.find()
        return response.status(200).send({ data: product })
    }
    catch (err) {
        response.status(400).json({ error: err.message })
    }
}

module.exports = { userDetailsApi, getAllBookingDetails }