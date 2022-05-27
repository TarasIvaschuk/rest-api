const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type", "Authorization");
  next();
});

const feedRoutes = require("./routes/feed");

mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING)
  .then((res) => {
    app.listen(8080);
    console.log("connected!");
  })
  .catch((err) => {
    console.log(err);
  });
app.use("/feed", feedRoutes);

