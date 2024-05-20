const { where } = require("sequelize");
const MessageModel = require("../models/messageModel");

const handlePostMessage = async (req, res, next) => {
  try {
    const user = req.user;
    console.log(user);
    const postData = {
      messageContent: req.body.messageText,
      senderName: user.name,
      userId: user.id,
      groupId: req.body.groupId,
    };
    console.log(postData);
    await MessageModel.create(postData);
    res.io.emit("DonePost", 111);
    res.send("OK");
  } catch (err) {
    console.log(err);
    res.send("Error");
  }
};

const getAllMessages = async (req, res, next) => {
  try {
    const id = req.params.groupId;
    console.log(id);
    const messages = await MessageModel.findAll({ where: { groupId: id } });
    res.status(200).json({ success: true, messages: messages });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  handlePostMessage,
  getAllMessages,
};
