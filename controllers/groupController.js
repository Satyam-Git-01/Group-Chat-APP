const GroupMemberModel = require("../models/groupMemberModel");
const GroupModel = require("../models/groupModel");
const UserModel = require("../models/userModel");

const { Op } = require("sequelize");

const createGroup = async (req, res, next) => {
  try {
    const groupName = req.body.name;
    const members = req.body.members;
    const createdGroup = await GroupModel.create({ groupName });
    const invitedMembers = await UserModel.findAll({
      where: {
        email: {
          [Op.in]: members,
        },
      },
    });
    invitedMembers.push(req.user);
    let isAdminValue = false;
    invitedMembers.forEach(async (item) => {
      if (item.id === req.user.id) {
        isAdminValue = true;
      } else {
        isAdminValue = false;
      }
      await GroupMemberModel.create({
        isAdmin: isAdminValue,
        userId: item.id,
        groupId: createdGroup.id,
      });
    });
    res.io.emit("DoneGroup");
    res
      .status(200)
      .json({ sucess: true, message: "group created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ sucess: false, message: "Failed to create group" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    const result = await GroupMemberModel.findOne({
      where: {
        groupId: req.params.groupId,
        userId: user.id,
      },
    });
    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};

const makeAdmin = (req, res, next) => {
  console.log("Reached-------------------->>>");
  try {
    console.log(req.body);
    const memberId = req.body.memberId;
    const groupId = req.body.groupId;
    const result = GroupMemberModel.update(
      { isAdmin: true },
      {
        where: {
          memberId: memberId,
          groupId: groupId,
        },
      }
    );
    res.io.emit("admin-made");
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
  }
};
const LeaveGroup = async (req, res, next) => {
  try {
    const groupId = req.params.id;
    const userId = req.params.userId == 0 ? req.user.id : req.params.userId;
    await GroupMemberModel.destroy({
      where: {
        userId: userId,
        groupId: groupId,
      },
    });
    res.io.emit("left-group");
    res.status(200).json({ sucess: true });
  } catch (err) {
    console.log(err);
  }
};

const getAllGroupsForUser = async (req, res, next) => {
  try {
    const groups = await GroupModel.findAll({
      include: [
        {
          model: GroupMemberModel,
          where: {
            userId: req.user.id,
          },
        },
      ],
    });
    res.status(200).json(groups);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error" });
  }
};

const addMember = async (req, res, next) => {
  console.log("Reached Add Member");
  try {
    const groupId = req.body.groupId;
    const members = req.body.members;
    const invitedMemebers = await UserModel.findAll({
      where: {
        email: {
          [Op.in]: members,
        },
      },
    });
    invitedMemebers.forEach(async (member) => {
      const groupMemberResult = await GroupMemberModel.create({
        isAdmin: false,
        userId: member.id,
        groupId: groupId,
      });
    });
    res.io.emit("DoneGroup");
    res.send("Success");
  } catch (err) {
    console.log(err);
  }
};

const groupInfo = async (req, res, next) => {
  try {
    const groupInfo = await GroupModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    const groupMemberInfo = await GroupMemberModel.findAll({
      include: [
        {
          model: UserModel,
          required: true,
        },
      ],
      where: {
        groupId: groupInfo.id,
      },
    });

    const resultObject = {
      groupInfo,
      groupMemberInfo,
    };
    res.send(resultObject);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createGroup,
  LeaveGroup,
  getAllGroupsForUser,
  groupInfo,
  addMember,
  makeAdmin,
  isAdmin,
};
