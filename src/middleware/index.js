const bcrypt = require("bcrypt")
const User = require("../users/model")

// async function timeNow(req, res, next) { // middleware needs three parameters
//     console.log ('Time:', Date.now())
//     next()
// }

// async function helloWorld (req, res, next) {
//     console.log ("Hello World")
//     next()
// }

// async function modBody (req, res, next) {
//     req.body.username = req.body.username + "modded"
// }

async function hashThePassword (req, res, next) {
    const hashedPassword = await bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUNDS))
    req.body.password = hashedPassword
    next()
}

async function comparePasswords (req, res, next) {
    userEntry = await User.findOne({username: req.body.username})
    console.log(userEntry)

    const compareCheck = await bcrypt.compare(req.body.password, userEntry.password)
    console.log(compareCheck)

    if(compareCheck == false) {
        res.status(500).send({
            message: "Passwords do not match"
        })
    } else {
        res.status(200).send({
            message: "Passwords match"
        })
        next()
    }
}

module.exports = {
    // timeNow, helloWorld, modBody
    hashThePassword, comparePasswords
}