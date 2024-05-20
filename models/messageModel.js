const { Sequelize } = require("sequelize");
const database = require("../services/dbConn");

const MessageModel = database.define("messages", {
    messageContent: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    senderName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = MessageModel;