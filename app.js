const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");
const http = require("http");
const bodyParse = require("body-parser");
const { Server } = require("socket.io");
const sequelize = require("./services/dbConn");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

//Application Level Middlewares
app.use(function (req, res, next) {
  res.io = io;
  next();
});
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());
app.use(express.static(path.join(__dirname, "public")));

const PORT_NUMBER = process.env.PORT_NUMBER || 5400;

//Importing Routes
const messageRouter = require("./routes/messageRoute");
const userRouter = require("./routes/userRoute");
const groupRouter = require("./routes/groupRoute");

//Importing Models 
const User = require("./models/userModel");
const Message = require("./models/messageModel");
const Group = require("./models/groupModel");
const GroupMember = require("./models/groupMemberModel");

//Route Level Middlewares
app.use("/", userRouter);
app.use("/user", userRouter);
app.use("/message", messageRouter);
app.use("/group", groupRouter);

//SQL Relations
User.hasMany(Message);
User.hasMany(GroupMember);

Group.hasMany(Message);
Group.hasMany(GroupMember);

GroupMember.belongsTo(User);
GroupMember.belongsTo(Group);

Message.belongsTo(Group);
Message.belongsTo(User);

sequelize
  .sync()
  .then((response) => {
    server.listen(PORT_NUMBER, () => {
      console.log(`APP URL is http://localhost:${PORT_NUMBER}`);
    });

    io.on("connection", (socket) => {
      console.log("User Connected");
      socket.on("sendMessage", (message) => {
        console.log(message);
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
