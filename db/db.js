const mongoose = require("mongoose");

function connectToDb() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to DB"))
    .catch((error) => {
      console.log("DB connection unsuccessufull !!");
      console.log("error : ", error);
    });
}

module.exports = connectToDb;
