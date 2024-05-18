const express = require("express");
const {
  getSignUpPage,
  handleLogin,
  handleSignUp,
} = require("../controllers/userController");
const { getHomePage } = require("../controllers/viewsController");
const userRouter = express.Router();

userRouter.get("/", getSignUpPage);
userRouter.post("/login", handleLogin);
userRouter.post("/signUp", handleSignUp);
userRouter.get("/homePage", getHomePage);

module.exports = userRouter;
