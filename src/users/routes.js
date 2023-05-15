const {Router} = require("express");
const userRouter = Router()
const {registerUser} = require("./controllers")
const {hashThePassword} = require ("../middleware/index")

userRouter.post("./users/register", timeNow, helloWorld, modBody, registerUser);

module.exports = userRouter