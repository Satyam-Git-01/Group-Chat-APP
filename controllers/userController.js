const path = require("node:path");
const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");
const getSignUpPage = (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "public", "views", "signup.html"));
};

const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({
      where: { email: email},
    });
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      res.status(200).json({ success: true, message: "Login Successfull" });
    } else {
      res.status(400).json({ success: false, message: "Credentials Error Enter Correct Data!" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Login Failed" });
  }
};

const handleSignUp = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;
    const encryptedpassword = await bcrypt.hash(password, 10);
    //console.log(encryptedpassword)
    await UserModel.create({ name, email, phone, password: encryptedpassword });
    res
      .status(201)
      .json({ success: true, message: "user create successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Email already Exists" });
  }
};
module.exports = {
  getSignUpPage,
  handleLogin,
  handleSignUp,
};
