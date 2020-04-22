'use strict';

const User = require('../models/user');

const signup = async (req, res) => {
  try {
    const {name, email, password} = req.body;
    const user = new User({name, email, password});
    user.password = await user.encode(password);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

const login = async (req, res) => {
  res.json({success: true});
};

module.exports = {
  signup,
  login
};
