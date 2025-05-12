const express = require("express")
const { userDetailsApi, getAllBookingDetails } = require("../controller/bookingController");
const bookRoute  = express.Router()



bookRoute.post("/bookingdetails", userDetailsApi)
bookRoute.get("/all-bookingdetails", getAllBookingDetails)


module.exports = { bookRoute }