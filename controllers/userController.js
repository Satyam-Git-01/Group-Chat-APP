const path = require("node:path");
const UserModel = require("../models/userModel");
const getSignUpPage = (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "public", "views", "signup.html"));
};

const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({
      where: { email: email, password: password },
    });
    console.log(user);
    if (user) {
      res.status(200).json({ success: true, message: "Login Successfull" });
    } else {
      res.status(400).json({ success: false, message: "Credentials Error" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Login Failed" });
  }
};

const handleSignUp = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;
    await UserModel.create({ name, email, phone, password });
    res
      .status(201)
      .json({ success: true, message: "user create successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "user creation failed" });
  }
};
module.exports = {
  getSignUpPage,
  handleLogin,
  handleSignUp,
};
