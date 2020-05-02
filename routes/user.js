'use strict';

const express = require('express');
const passport = require('passport');

const router = express.Router();
const userController = require('../controllers/user');

router.route('/signup').post(userController.signup);
router.post('/login', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send({error: 'Incorrect email or password!'});
    }
    // req.login function provided by passportjs triggers serializeUser.
    // which in turn save the user id in session (in mongodb session store).
    req.login(user, (err) => {
      return res.status(500);
    });
    res.status(200).json({userId: user._id});
  })(req, res, next);
});

router.get('/dashboard', userController.getDashboard);

module.exports = router;
