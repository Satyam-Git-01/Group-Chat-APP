const express = require("express");
const messageRouter = express.Router();
const multer = require("multer");
const path = require("path");
const {
  handlePostMessage,
  getAllMessages,
} = require("../controllers/messageController");
const authenticate = require("../middlewares/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../","uploads/")); // File uploads will be stored in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

messageRouter.post(
  "/sendMessage",
  authenticate,
  upload.single("image"),
  handlePostMessage
);
messageRouter.get("/getAllMessages/:groupId", authenticate, getAllMessages);

module.exports = messageRouter;
