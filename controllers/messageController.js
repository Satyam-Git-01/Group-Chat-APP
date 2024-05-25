const MessageModel = require("../models/messageModel");
const { uploadTos3 } = require("../services/S3Services");
const fs = require("fs");

const handlePostMessage = async (req, res, next) => {
  try {
    const user = req.user;
    if (!req.file) {
      const postData = {
        messageContent: req.body.messageText,
        senderName: user.name,
        userId: user.id,
        groupId: req.body.groupId,
      };
      console.log(postData);
      await MessageModel.create(postData);
      res.io.emit("DonePost", 111);
    } else {
      const fileName = req.file.filename;
      const data = fs.readFileSync(req.file.path);
      const fileURL = await uploadTos3(data, 'chatappImages/'+fileName);
      const postData = {
        messageContent: fileURL,
        senderName: user.name,
        userId: user.id,
        groupId: req.body.groupId,
      };
      await MessageModel.create(postData);
      res.io.emit("DonePost", 122);
    }

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
