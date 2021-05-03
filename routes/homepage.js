const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('homepage', {
    pageTitle: 'Home Budget App',
    path: '/',
    isLogged: req.session.isLogged,
    userName: req.session.userName,
  });
});

module.exports = router;
