const express = require('express');
const router = express.Router();
const userNotLogged = require('../../middleware/userNotLogged.js');

router.get('/', userNotLogged, (req, res) => {
  let message = req.flash('successfulMessage');
  console.log(message.length);
  if (message.length >= 1) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('user/budget-expense', {
    pageTitle: 'Home Budget App',
    path: '/user',
    userName: req.session.userName,
    successfulMessageFlash: message,
  });
});

module.exports = router;
