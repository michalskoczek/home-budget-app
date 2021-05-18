const express = require('express');
const { budgetValidation } = require('../validation');
const Budget = require('../model/Budget');

exports.getBudgetExpense = async (req, res) => {
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

  const budgetAmount = await Budget.find({
    userId: req.session.userId,
  });

  if (budgetAmount) {
    res.render('user/user-page', {
      pageTitle: 'Home Budget App',
      path: '/user',
      userBudget: budgetAmount[budgetAmount.length - 1].amount,
      userName: req.session.userName,
      errorMessageFlash: messagesFlash.errorMessage,
      successfulMessageFlash: messagesFlash.successfulMessage,
    });
  } else {
    res.render('user/user-page', {
      pageTitle: 'Home Budget App',
      path: '/user',
      userBudget: null,
      userName: req.session.userName,
      errorMessageFlash: messagesFlash.errorMessage,
      successfulMessageFlash: messagesFlash.successfulMessage,
    });
  }
};

exports.postBudgetAmount = async (req, res) => {
  const { error } = budgetValidation(req.body);
  if (error) {
    req.flash('errorMessage', error.details[0].message);
    return res.redirect('/user/:name');
  }

  const budget = new Budget({
    userId: req.session.userId,
    amount: req.body.budget,
  });

  try {
    const savedBudget = await budget.save();
    if (savedBudget) {
      req.flash('successfulMessage', 'Budget is correct');
      res.redirect('/user/:name');
    }
  } catch (err) {
    console.log(err);
  }
};
