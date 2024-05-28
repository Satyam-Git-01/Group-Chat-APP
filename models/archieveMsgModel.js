const { Sequelize } = require("sequelize");
const sequelize = require("../services/dbConn");

const ArchieveMessageModel = sequelize.define("archieves", {
  messageContent: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senderName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
module.exports = ArchieveMessageModel;
