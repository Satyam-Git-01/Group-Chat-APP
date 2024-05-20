const express = require("express");
const messageRouter = express.Router();
const { handlePostMessage, getAllMessages } = require("../controllers/messageController");
const authenticate = require("../middlewares/auth");

messageRouter.post("/sendMessage", authenticate, handlePostMessage);
messageRouter.get('/getAllMessages/:groupId', authenticate,getAllMessages)

module.exports = messageRouter;
