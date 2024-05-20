const express = require("express");
const {
  createGroup,
  LeaveGroup,
  getAllGroupsForUser,
  groupInfo,
  addMember,
  makeAdmin,
  isAdmin
} = require("../controllers/groupController");
const { getGroupInfoPage } = require("../controllers/viewsController");

const authenticate = require("../middlewares/auth");

const groupRouter = express.Router();

groupRouter.get("/getAllGroupsForUser/", authenticate, getAllGroupsForUser);
groupRouter.post("/createGroup", authenticate, createGroup);
groupRouter.delete("/deleteGroup/:id/:userId", authenticate, LeaveGroup);
groupRouter.get("/getGroupInfoPage", getGroupInfoPage);
groupRouter.get("/getInfo/:id", groupInfo);
groupRouter.post('/addMember',addMember)
groupRouter.put('/makeAdmin',makeAdmin)
groupRouter.get('/isAdmin/:groupId',authenticate,isAdmin)


module.exports = groupRouter;
