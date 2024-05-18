const { where } = require("sequelize");
const MessageModel = require("../models/messageModel");

const handlePostMessage = async (req, res, next) => {
  try {
    const user = req.user;
    const postData = {
      messageContent: req.body.messageText,
      senderName: user.name,
      userId: user.id,
    };
    console.log(postData);
    await MessageModel.create(postData);
    res.send("OK");
  } catch (err) {
    console.log(err);
    res.send("Error");
  }
};

const getAllMessages = async (req, res, next) => {
  try {
    const messages = await MessageModel.findAll();
    res.status(200).json({ success: true, messages: messages });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  handlePostMessage,
  getAllMessages
};
