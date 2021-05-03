const express = require('express');
const router = express.Router();
const userNotLogged = require('../../middleware/userNotLogged.js');

router.get('/', userNotLogged, (req, res) => {
  res.render('user/budget-expense', {
    pageTitle: 'Home Budget App',
    path: '/user',
    isLogged: req.session.isLogged,
    userName: req.session.userName,
  });
});

module.exports = router;
