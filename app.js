/** @format */
require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db.js");
const bodyParser = require("body-parser");
app = express();

app.use(bodyParser.json());

connectDB();
const user = require("./src/route/user.js");
app.use("/api/user", user);



// listen for requests
if (!module.parent) {
  app.listen(8000, () => {
    console.log("Server is listening on port 8000");
  });
}
module.exports = app;
