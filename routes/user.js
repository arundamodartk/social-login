'use strict';

const express = require('express');
const passport = require('passport');

const router = express.Router();
const userController = require('../controllers/user');

router.route('/signup').post(userController.signup);
router.route('/login').post(
    passport.authenticate('local', {session: false}),
    userController.login
);

module.exports = router;
