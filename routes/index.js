const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session.isLoggedIn);
  res.render('index', {title: 'Social Login'});
});

/* GET home page. */
router.get('/login', function(req, res, next) {
  console.log(req.session.isLoggedIn);
  res.render('login-page', {title: 'Social Login'});
});

/* GET home page. */
router.get('/signup', function(req, res, next) {
  res.render('signup-page', {title: 'Social Login'});
});

module.exports = router;
