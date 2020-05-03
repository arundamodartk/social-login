'use strict';

const User = require('../models/user');

const signup = async (req, res) => {
  try {
    const {name, email, password} = req.body;
    const existingUser = await User.findOne({email: email});
    console.log(`existing usr ${existingUser}`);
    if (existingUser) {
      res.status(422).json({
        message: 'Email already exists',
        userInput: req.body
      });
    } else {
      const user = new User({name, email, password});
      user.password = await user.encode(password);
      await user.save();
      res.json(user);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const getDashboard = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  // req.user & req.isAuthenticated() are 2 useful access provided by passportjs
  res.render('dashboard', {
    title: 'Social Login',
    name: (req.user && req.user.name) || 'user',
    isLoggedIn: true
  });
};

module.exports = {
  signup,
  getDashboard
};
