const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({

    booking_type: { type: String, required: true },
    address: { type: String, required: true },
    no_of_pets: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    user_id: { type: String, required: true },

})

module.exports = { bookingSchema }