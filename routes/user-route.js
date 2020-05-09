'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/dashboard', userController.getDashboard);

module.exports = router;
