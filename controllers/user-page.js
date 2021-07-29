const express = require('express');
const { budgetValidation, expenseValidation } = require('../validation');
const Budget = require('../model/Budget');
const Expense = require('../model/Expense');

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

  const expense = await Expense.find({
    userId: req.session.userId,
  });
  let lastBudgetAmount = null;
  if (budgetAmount.length !== 0) {
    lastBudgetAmount = budgetAmount[budgetAmount.length - 1].amount;
  }

  let sumOfExpenses = 0;
  let userBalance = 0;
  if (expense.length !== 0) {
    let expensesAmounts = expense.map((element) => {
      return element.amount;
    });
    sumOfExpenses = expensesAmounts.reduce((previousValue, currentValue) => {
      return previousValue + currentValue;
    });
  }

  if (budgetAmount.length !== 0) {
    res.render('user/user-page', {
      pageTitle: 'Home Budget App',
      path: '/user',
      userBudget: budgetAmount[budgetAmount.length - 1].amount,
      userExpense: expense,
      sumOfUserExpenses: sumOfExpenses ? sumOfExpenses : null,
      userName: req.session.userName,
      errorMessageFlash: messagesFlash.errorMessage,
      successfulMessageFlash: messagesFlash.successfulMessage,
    });
  } else {
    res.render('user/user-page', {
      pageTitle: 'Home Budget App',
      path: '/user',
      userBudget: null,
      userExpense: null,
      sumOfUserExpenses: null,
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

exports.postExpense = async (req, res) => {
  const { error } = expenseValidation(req.body);
  if (error) {
    req.flash('errorMessage', error.details[0].message);
    return res.redirect('/user/:name');
  }

  const expense = new Expense({
    userId: req.session.userId,
    title: req.body.title,
    amount: req.body.expense,
  });

  try {
    const savedExpense = await expense.save();
    if (savedExpense) {
      req.flash('successfulMessage', 'Expense is correct');
      res.redirect('/user/:name');
    }
  } catch (err) {
    console.log(err);
  }
};
