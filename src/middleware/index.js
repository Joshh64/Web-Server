const bcrypt = require("bcrypt")

async function timeNow(req, res, next) { // middleware needs three parameters
    console.log ('Time:', Date.now())
    next()
}

async function helloWorld (req, res, next) {
    console.log ("Hello World")
    next()
}

async function modBody (req, res, next) {
    req.body.username = req.body.username + "modded"
}

async function hashThePassword (req, res, next) {
    const hashedPassword = await bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUNDS))
    req.body.password = hashedPassword
    next()
}

module.exports = {
    hashThePassword
}