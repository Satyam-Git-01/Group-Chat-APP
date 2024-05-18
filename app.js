const express = require("express");
const dotenv = require("dotenv").config();
const bodyParse = require("body-parser");
const sequelize = require("./services/dbConn");
const app = express();
const PORT_NUMBER = process.env.PORT_NUMBER || 5400;


//Application Level Middlewares
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());
app.use(express.static("public"));

//Importing Routes
const messageRouter = require("./routes/messageRoute");
const userRouter = require("./routes/userRoute");

//Importing Models
const User = require("./models/userModel");
const Message = require("./models/messageModel");

//Route Level Middlewares
app.use("/", userRouter);
app.use("/user", userRouter);
app.use('/message',messageRouter)

//SQL Relations
User.hasMany(Message);
Message.belongsTo(User);

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
