const bcrypt = require("bcrypt")
const User = require("../users/model")
const jwt = require("jsonwebtoken")


// Middleware Functions
async function hashThePassword(req, res, next) {
  try {
    const salt = await bcrypt.genSalt(10); // Generate a salt value
    const hashedPassword = await bcrypt.hash(req.body.password, salt); // Hash the password with the generated salt
    req.body.password = hashedPassword;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: error.message
    });
  }
}


async function comparePasswords(req, res, next) {
    try {
        console.log(req.body.password)
        // req.body.password with the hashed password that we've stored in the database
        
        // the hashed version from the database to compare the plain text version with the hashed password
        req.userInfo = await User.findOne({
            username: req.body.username
        })
        
        // compare the plain text password with the hashed password stored in the database
        if(req.userInfo && await bcrypt.compare(req.body.password, req.userInfo.password)) {
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

async function tokenCheck (req, res, next) {
    try {
        // get the encoded token from the authorization header
        const token = req.header("Authorization")
        console.log(token)

        // decoded token and check if it contains the secret key from our server
        const decodedToken = await jwt.verify(token, process.env.SECRET_KEY)
        console.log(decodedToken.id)
        // check if the id exists in our database
        const user = await User.findById(decodedToken.id)
        console.log(user)

        // if a user has been found in our database using the id encoded in the token
        if(user) {
            // move on to the controller
            next()
        } else {
            throw new Error ("user is not authorised")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: error.message
        })
    }
}

module.exports = {
    hashThePassword,
    comparePasswords,
    validateUserEmail,
    tokenCheck
};