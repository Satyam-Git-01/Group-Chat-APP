const Sequelize = require("sequelize");
const sequelize = require("../services/dbConn");

const UserModel = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  email: { type: Sequelize.STRING, unique: true, allowNull: false },
  password: Sequelize.STRING,
  phone: { type: Sequelize.STRING, unique: true, allowNull: false },
});

module.exports = UserModel;
