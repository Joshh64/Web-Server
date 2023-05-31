const express = require("express")
const cors = require("cors")
require("dotenv").config()
const app = express();
const port = process.env.PORT || 5002
const userRouter = require("./users/routes")
const movieRouter = require("./movies/routes")

app.use(cors()) // enable requests from any orign

app.use(express.json())

app.get("/health", (req, res) => {
    res.status(200).send({
        message: "API is working"
    })
})

app.use(userRouter)

app.use(movieRouter)

const checkConnection = require("./db/connection")
console.log(checkConnection)

app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})