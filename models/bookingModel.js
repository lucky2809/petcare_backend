const mongoose = require("mongoose")
const { generateAlphanumericSerial } = require("../utils/helperFunc")




// const bookingSchema = new mongoose.Schema({

//     booking_type: { type: String, required: false},
//     address: { type: String, required: false},
//     no_of_pets: { type: String, required: false},
//     start_date: { type: Date, required: false},
//     end_date: { type: Date, required: false},
//     user_id: { type: String, required: false},


// })

const userBookingSchema = new mongoose.Schema({

    booking_no: { type: String, default: generateAlphanumericSerial, unique: true },
    first_name: { type: String, required: false},
    last_name: { type: String, required: false},
    email: { type: String, required: false},
    phone_no: { type: Number, required: false},
    booking_type: { type: Array, required: false},
    address: { type: String, required: false},
    start_date: { type: Date, required: false},
    end_date: { type: Date, required: false},
    user_id: { type: String, required: false},
    petDetails: { type: Array, required: false},
    boardingDetails: { type: Object, required: false },
    taxiDetails: { type: Object, required: false },
    groomingDetails: { type: Object, required: false },

})

const BookingModel = mongoose.model("booking", userBookingSchema)

module.exports = { BookingModel }