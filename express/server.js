'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const cors = require("cors");
const mongoose = require("mongoose");

const config = require("./config");

mongoose.Promise = global.Promise;
mongoose
  .connect(config.DB, { useNewUrlParser: true })
  .then(() => console.log("Database is connected"))
  .catch(err => console.log(`Cannot connect to the database ${err}`));


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/users", require("./routes/users"));

app.listen(config.port, () =>
  console.log(`Server is running on port: ${config.port}`)
);