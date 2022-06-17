const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userRoute = require('./routes/userRoute');
const cors = require('cors');

const { requireAuth, checkUser } = require('./middleware/auth');


require("dotenv").config();

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const uri = `mongodb+srv://${process.env.name}:${process.env.password}@cluster0.cgzwi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;







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
  console.log(`Server is listening on port ${port}`);
});


app.get('/', checkUser);
app.use(userRoute);