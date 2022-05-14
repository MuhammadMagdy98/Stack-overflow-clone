const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uri = `mongodb+srv://${process.env.name}:${process.env.password}@cluster0.cgzwi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

app.get("/", (req, res) => {
  console.log("hi");
  res.status(200).send("OK");
});

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    //console.log("connected to db");
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.listen(port, () => {
  console.log("Server is listening on port 3000");
});
