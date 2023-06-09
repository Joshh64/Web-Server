const User = require("./model")
const jwt = require("jsonwebtoken")

async function registerUser(req, res) {
    try {
        await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        res.status(201).send({
            message: "User details successfully created",
            user: req.body.username
        })
    } catch (error) {
        console.log(error)
        res.status(501).send({
            message: error.message
        })
    }
}

async function login(req, res) {
    try {
        if (req.authUser) {
            res.status(200).send({
                message: "success",
                user: {
                    username: req.authUser.username,
                    email: req.authUser.email
                }
            });
            return;
        }

        // to generate a token we need 1 bits of information: the secret key and the user id
        // user id can be accessed from the req.userInfo object
        const token = await jwt.sign({
            id: req.userInfo._id
        }, process.env.SECRET_KEY)

        console.log (res.status(200).send({
            message: "Successfully logged in",
            user: req.body.username,
            token: token
        }))
    } catch (error) {
        console.log(error)
        res.status(501).send({
            message: error.message
        })
    }
}


async function readUsers (req, res) {
    try {
        const users = await User.find({})
        res.status(200).send({
            users: users
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: error.message
        })
    }
}

async function updateUser(req, res) {
    try {
        const { username, newPassword } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({
            message: "Password successfully updated!",
            updatedUser: user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            errorMessage: error.message
        });
    }
}

async function deleteUser(req, res) {
    try {
        const deletedUser = await User.findOneAndDelete({
            username: req.body.username
        })
        if (!deletedUser) {
            return res.status(404).send({
                message: "User not found"
            })
        }
        res.status(200).send({
            message: "User successfully deleted",
            user: deletedUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: error.message
        })
    }
}

module.exports = {
    registerUser,
    login,
    readUsers,
    updateUser,
    deleteUser
}