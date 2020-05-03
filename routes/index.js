const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/user/dashboard');
  }
  res.render('index', {
    title: 'Social Login',
    isLoggedIn: false
  });
});

/* GET home page. */
router.get('/login', function(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/user/dashboard');
  }
  res.render('login-page', {
    title: 'Social Login',
    isLoggedIn: false
  });
});

/* GET home page. */
router.get('/signup', function(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/user/dashboard');
  }
  res.render('signup-page', {
    title: 'Social Login',
    isLoggedIn: false
  });
});

module.exports = router;
