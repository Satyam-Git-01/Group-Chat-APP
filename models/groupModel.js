const Sequelize = require("sequelize");
const sequelize = require("../services/dbConn");

const GroupModel = sequelize.define("groups", {
  groupName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports= GroupModel
