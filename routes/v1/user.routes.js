const { UserController } = require("../../controller/index");

const express = require("express");
const userRoutes = express.Router();
const verifyUserToken = require("../../utils/verifyUserToken");
const {
    createAdminUser,
    signInAdminUser,
    addUser,
    editUser
  } = require("../../validators/user.validator");

//signup admin add admin
userRoutes.post("/admin/signup", createAdminUser, UserController.signupAdmin);
//login admin
userRoutes.post("/admin/signin", signInAdminUser, UserController.signInAdmin);

//create user
userRoutes.post("/create", verifyUserToken, addUser, UserController.createUser);

//create user
userRoutes.get("/get", verifyUserToken, UserController.getUser);

//edit user
userRoutes.put("/update/:id", verifyUserToken, editUser, UserController.updateUser);

//delete user
userRoutes.delete("/delete/:id", verifyUserToken, UserController.deleteUser);

module.exports = userRoutes;
