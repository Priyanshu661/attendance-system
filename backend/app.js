const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const sequelize = require("./database/db");

const attendanceRoutes=require("./routers/attendance")

const app = express();

app.use(cors());
app.use(bodyParser.json());

console.log("data1")

app.use(attendanceRoutes);

console.log("data2");

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: "Internal Server Error" });
});

sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });