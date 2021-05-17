const express = require('express');
const { budgetValidation } = require('../validation');
const Budget = require('../model/Budget');

exports.getBudgetExpense = (req, res) => {
  if (req.params.name !== req.session.userName)
    return res.redirect(`/user/${req.session.userName}`);

  let messagesFlash = {
    errorMessage: req.flash('errorMessage'),
    successfulMessage: req.flash('successfulMessage'),
  };

  if (
    messagesFlash.errorMessage.length > 0 ||
    messagesFlash.successfulMessage.length > 0
  ) {
    messagesFlash.errorMessage = messagesFlash.errorMessage[0];
    messagesFlash.successfulMessage = messagesFlash.successfulMessage[0];
  } else {
    messagesFlash.errorMessage = null;
    messagesFlash.successfulMessage = null;
  }
  res.render('user/user-page', {
    pageTitle: 'Home Budget App',
    path: '/user',
    userName: req.session.userName,
    errorMessageFlash: messagesFlash.errorMessage,
    successfulMessageFlash: messagesFlash.successfulMessage,
  });
};

exports.postBudgetAmount = async (req, res) => {
  const { error } = budgetValidation(req.body);
  if (error) {
    req.flash('errorMessage', error.details[0].message);
    return res.redirect('/user/:name');
  }

  const budget = new Budget({
    amount: req.body.budget,
  });

  try {
    const savedBudget = await budget.save();
    if (savedBudget) {
      req.flash('successfulMessage', 'Budget is correct');
      console.log('budget is correct');
      res.sendStatus(200);
    }
  } catch (err) {
    console.log(err);
  }
};
