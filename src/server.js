const express = require("express")
require("dotenv").config()
const app = express();
const port = process.env.PORT
const userRouter = require("./users/model")

app.use(express.json())

app.use(userRouter)

app.get("/health", (req, res) => {
    res.status(200).send({
        message: "API is working"
    })
})

const checkConnection = require("./db/connection")
console.log(checkConnection)

app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})