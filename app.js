const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const feedRoutes = require("./routes/feed");

app.use("/feed", feedRoutes);

app.listen(8080);