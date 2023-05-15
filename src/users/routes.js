const {Router} = require("express");
const userRouter = Router()
const {registerUser, login} = require("./controllers")
const {hashThePassword, comparePasswords} = require ("../middleware/index")

userRouter.post("/users/register", hashThePassword, registerUser);

userRouter.post("/users/login", comparePasswords, login)

module.exports = userRouter