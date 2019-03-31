const User = require("../models/user");

module.exports = {
  index: async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
  },

  post: async (req, res) => {
    const { body } = req.value;
    const newUser = new User(body);
    await newUser.save();
    res.status(200).json(newUser);
  },

  get: async (req, res) => {
    const { id } = req.value.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  },

  update: async (req, res) => {
    const { id } = req.value.params;
    const { body } = req.value;
    await User.findByIdAndUpdate(id, body);
    res.status(200).json({ success: true });
  },

  delete: async (req, res) => {
    const { id } = req.value.params;
    const foundUser = await User.findById(req.params.id);
    if (!User) {
      return res.status(404).json({ error: `User doesn't exist` });
    }
    await foundUser.remove();
    res.status(200).json({ success: true });
  }
};
