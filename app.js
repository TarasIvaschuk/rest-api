const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const feedRoutes = require("./routes/feed");
const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type", "Authorization");
  next();
});

app.use("/feed", feedRoutes);

app.use((err, req, res) => {
  const status = err.statusCode || 500;
  const message = err.message;
  res.status(status).json({ message });
});

mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING)
  .then(() => {
    app.listen(8080);
    console.log("connected!");
  })
  .catch((err) => {
    console.log(err);
  });