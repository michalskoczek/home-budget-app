const express = require('express');
const router = express.Router();
const userNotLogged = require('../../middleware/userNotLogged.js');

router.get('/:name', userNotLogged, (req, res) => {
  if (req.params.name !== req.session.userName)
    return res.redirect(`/user/${req.session.userName}`);

  let successfulMessage = req.flash('successfulMessage');
  if (successfulMessage.length > 0) {
    successfulMessage = successfulMessage[0];
  } else {
    successfulMessage = null;
  }
  res.render('user/budget-expense', {
    pageTitle: 'Home Budget App',
    path: '/user',
    userName: req.session.userName,
    successfulMessageFlash: successfulMessage,
    errorMessageFlash: null,
  });
});

module.exports = router;
