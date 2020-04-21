'use strict';

const User = require('../models/user');

const signup = async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  signup
};
