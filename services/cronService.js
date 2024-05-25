const CronJob = require("cron").CronJob;
const Sequelize = require("sequelize");
const sequelize = require("../services/dbConn");
const MessageModel = require("../models/messageModel");
const ArchieveMessageModel = require("../models/archieveMsgModel");

const job = new CronJob("0 0 * * *", function () {
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
  MessageModel.findAll({
    where: {
      createdAt: {
        [Sequelize.Op.lt]: yesterday,
      },
    },
  }).then((chats) => {
    ArchieveMessageModel.bulkCreate(chats).then(() => {
      MessageModel.destroy({
        where: {
          createdAt: {
            [Sequelize.Op.lt]: yesterday,
          },
        },
      });
    });
  });
});

module.exports = job;
