'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user');

router.post('/signup', userController.signup);

router.post('/login', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send({
        errorMessage: 'Incorrect email or password!'
      });
    }
    // req.login function provided by passportjs triggers serializeUser.
    // which in turn save the user id in session (in mongodb session store).
    req.login(user, (err) => {
      return res.status(500);
    });
    res.status(200).send({userId: user._id});
  })(req, res, next);
});

router.get('/logout', userController.logoutUser);

// to get authentication with google to get
router.get('/google',
    passport.authenticate('google', {scope: ['profile', 'email']})
);

// callback route google redirect to.
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/user/dashboard');
});

module.exports = router;
