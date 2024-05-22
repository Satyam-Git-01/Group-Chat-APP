const path = require("path");
const getHomePage = (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "public", "views", "homePage.html"));
};

const getGroupInfoPage = (req, res, next) => {
   res.sendFile(
    path.join(__dirname, "../", "public", "views", "groupInfo.html")
  );
};

module.exports = {
  getHomePage,
  getGroupInfoPage
};
