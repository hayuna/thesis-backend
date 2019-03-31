const { Schema, model } = require("mongoose");

const User = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String }
});

module.exports = model("User", User);
