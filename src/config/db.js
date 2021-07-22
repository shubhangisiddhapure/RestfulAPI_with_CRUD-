/** @format */

const mongoose = require("mongoose");
const process = require("process");
const db = process.env.MONGOOURI;


const connectDB = async () => {
    if (process.env.NODE_ENV !== "test") {
      try {
        await mongoose.connect(db, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        });
        console.log("mongooDB connected");
      } catch (err) {
        console.log(err);
        process.exit(1);
      }
    }
  
};

module.exports = connectDB;
