const express = require('express');
const router = express.Router();

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

module.exports = router;
