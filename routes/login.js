const express = require('express');
const router = express.Router();
const authenticate = require('.././authenticate');
const loginController = require('../controllers/login');

router.get('/', (req, res) => {
  res.render('login', {
    pageTitle: 'Home Budget App',
    successfulResgistration: false,
    messageRegistration: 'Your profile has just created!',
  });
});

router.get('/user', (req, res) => {
  res.render('login', {
    pageTitle: 'Home Budget App',
    successfulResgistration: true,
    messageRegistration: 'Your profile has just created!',
  });
});

router.post('/', authenticate, loginController.postLoginAuth);

module.exports = router;
