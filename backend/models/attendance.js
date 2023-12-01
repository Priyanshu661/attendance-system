const Sequelize = require("sequelize");

const sequelize = require("../database/db");

const AttendanceReport = sequelize.define("AttendanceReport", {
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  studentName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  attendance: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = AttendanceReport;
