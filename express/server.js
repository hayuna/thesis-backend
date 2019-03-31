'use strict';
const express = require('express');
const serverless = require('serverless-http');
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

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/another', (req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Another Hello from Express.js!</h1>');
  res.end();
});
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/users", require("./routes/users"));
app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
