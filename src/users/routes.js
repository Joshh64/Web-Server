const {Router} = require("express");
const userRouter = Router()
const {registerUser, login, readUsers, updateUser, deleteUser} = require("./controllers")
const {hashThePassword, comparePasswords, validateUserEmail, tokenCheck} = require ("../middleware/index")

userRouter.post("/users/register", hashThePassword, validateUserEmail, registerUser);
userRouter.post("/users/login", comparePasswords, login)
userRouter.get("/users/readUsers", readUsers)
userRouter.get("/users/authCheck", tokenCheck, login)
userRouter.put("/users/updateUser", hashThePassword, updateUser)
userRouter.delete("/users/deleteUser", deleteUser)

module.exports = userRouter