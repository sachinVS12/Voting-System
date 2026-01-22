const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/voting-system")
    .then(() => {
      console.log("Database connection successful!");
    })
    .catchcatch((error) => {
      console.log("database connection is failed!");
      console.log("Atempting to reconnect.....");
      setTimeout(() => {
        connectDB();
      }, 2000);
    });
};

module.exports = connectDB;
