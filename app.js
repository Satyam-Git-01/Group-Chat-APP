const express = require("express");
const dotenv = require("dotenv").config();
const bodyParse = require("body-parser");
const sequelize = require("./services/dbConn");
const app = express();
const PORT_NUMBER = process.env.PORT_NUMBER || 5400;

app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());
app.use(express.static("public"));
const userRouter = require("./routes/userRoute");
app.use("/", userRouter);
app.use("/user", userRouter);




sequelize
  .sync()
  .then((response) => {
    app.listen(PORT_NUMBER, () => {
      console.log(`APP URL is http://localhost:${PORT_NUMBER}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
