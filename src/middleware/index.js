const bcrypt = require("bcrypt")
const User = require("../users/model")


// Middleware Functions
async function hashThePassword(req, res, next) {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10) // code to hash password
        next()
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: error.message
        })
    }
}


async function comparePasswords(req, res, next) {
    try {
        console.log(req.body.password)
        // req.body.password with the hashed password that we've stored in the database
        
        // the hashed version from the database to compare the plain text version with the hashed password
        let userInfo = await User.findOne({
            username: req.body.username
        })
        console.log(userInfo) 
        
        // compare the plain text password with the hashed password stored in the database
        if(userInfo && await bcrypt.compare(req.body.password, userInfo.password)) {
            console.log("User found in our database and passwords")
            next()
        } else {
            throw new Error ("username or password incorrect")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: error.message
        })
    }
}

function validateEmail(email) {
    // Use a regular expression to check if the email contains the "@" sign
    const emailRegex = /^.+@.+\..+$/;
    return emailRegex.test(email);
}

function validateUserEmail(req, res, next) {
    try {
        const { email } = req.body;

        if (!validateEmail(email)) {
            throw new Error("Invalid email format");
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(400).send({
            error: error.message
        });
    }
}

module.exports = {
    hashThePassword,
    comparePasswords,
    validateUserEmail
};