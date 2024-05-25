const { Sequelize } = require("sequelize");
const { sequelize } = require("../services/dbConn");

const ArchieveMessageModel = sequelize.define("archieves", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  message: {
    type: Sequelize.STRING,
  },
});
module.exports = ArchieveMessageModel;
