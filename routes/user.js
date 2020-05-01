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
    // res.setHeader('Set-Cookie', 'isLoggedIn=true');
    req.session.isLoggedIn = true;
    res.json({success: true});
  })(req, res, next);
});

router.get('/dashboard', userController.getDashboard);

module.exports = router;
