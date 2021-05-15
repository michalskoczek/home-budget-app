const express = require('express');
const { budgetValidation } = require('../validation');

exports.getBudgetExpense = (req, res) => {
  if (req.params.name !== req.session.userName)
    return res.redirect(`/user/${req.session.userName}`);

  let successfulMessage = req.flash('successfulMessage');
  if (successfulMessage.length > 0) {
    successfulMessage = successfulMessage[0];
  } else {
    successfulMessage = null;
  }
  res.render('user/user-page', {
    pageTitle: 'Home Budget App',
    path: '/user',
    userName: req.session.userName,
    successfulMessageFlash: successfulMessage,
    errorMessageFlash: null,
  });
};

exports.postBudgetAmount = (req, res) => {
  console.log(req.body);
  const { error } = budgetValidation(req.body);

  if (error) {
    console.log(error.message);
    return res.redirect('/user/:name');
  }
};
