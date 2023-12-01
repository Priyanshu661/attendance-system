const Sequelize = require("sequelize");

const sequelize = new Sequelize("sharpner", "root", "@Pr9617901092", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
