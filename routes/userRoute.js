const express= require('express');
const { getSignUpPage, handleLogin,handleSignUp } = require('../controllers/userController');
const userRouter= express.Router();

userRouter.get('/',getSignUpPage)
userRouter.post('/login',handleLogin)
userRouter.post('/signUp',handleSignUp)

module.exports=userRouter