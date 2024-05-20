const Sequelize = require("sequelize");
const sequelize = require("../services/dbConn");

const GroupMemberModel = sequelize.define("groupMembers", {
  memberId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});
module.exports = GroupMemberModel;
