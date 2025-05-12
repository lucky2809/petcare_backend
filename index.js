const express = require("express")
const cors = require("cors")
const { connectDB } = require("./utils/db")
const { userRoute } = require("./Routes/userRoutes")
const { breedRoute } = require("./Routes/breedRoutes")
const { blogRoute } = require("./Routes/bolgRoutes")
const { bookRoute } = require("./Routes/bookingRouter")
require("dotenv").config()
const PORT = process.env.BACK_END_URL_PORT || 5000
const app = express()
app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
connectDB()



// app.use("/api", getAllUsers)

// app.get("/api/data-by-id",getAllById)

app.use("/api",userRoute)
// app.use("/api/tokenverification",userRoute)
app.use("/api/breed",breedRoute)
app.use("/api/blog", blogRoute)
app.use("/api/booking", bookRoute)


app.listen(PORT, () =>{
    console.log(`Server is runing ${PORT}`)
})