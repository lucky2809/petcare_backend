const mongoose = require("mongoose")
const { generateAlphanumericSerial } = require("../utils/helperFunc")

const { Schema } = require("mongoose")


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
    first_name: { type: String, required: false },
    last_name: { type: String, required: false },
    email: { type: String, required: false },
    phone_no: { type: String, required: false },
    booking_type: { type: [String], required: false },
    address: { type: String, required: false },
    start_date: { type: Date, required: false },
    end_date: { type: Date, required: false },
    user_id: { type: String, required: false },
    petDetails: { type: [Schema.Types.Mixed], required: false },
    boardingDetails: { type: Schema.Types.Mixed, required: false },
    taxiDetails: { type: Schema.Types.Mixed, required: false },
    groomingDetails: { type: Schema.Types.Mixed, required: false },
    pet_type: { type: String, required: false, default: "cat" },


}, {
    timestamps: true,
})

const BookingModel = mongoose.model("booking_data", userBookingSchema)

module.exports = { BookingModel }