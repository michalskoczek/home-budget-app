const bcrypt = require('bcryptjs');
const User = require('../model/User');
const { loginValidation } = require('../validation');

exports.getLoginPage = (req, res) => {
  let errorMessage = req.flash('errorMessage');
  if (errorMessage.length >= 1) {
    errorMessage = errorMessage[0];
  } else {
    errorMessage = null;
  }

  res.render('login', {
    pageTitle: 'Home Budget App',
    path: '/login',
    userName: req.session.userName,
    errorMessageFlash: errorMessage,
    successfulMessageFlash: null,
  });
};

exports.getLoggedPage = (req, res) => {
  let successfulMessage = req.flash('successfulMessage');
  if (successfulMessage.length >= 1) {
    successfulMessage = successfulMessage[0];
  } else {
    successfulMessage = null;
  }

  res.render('login', {
    pageTitle: 'Home Budget App',
    path: '/login',
    successfulMessageFlash: successfulMessage,
    errorMessageFlash: null,
  });
};

exports.postLoginAuth = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    req.flash('errorMessage', `${error.details[0].message}`);
    return res.redirect('/login');
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    req.flash('errorMessage', 'Email is not found');
    return res.redirect('/login');
  }

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    req.flash('errorMessage', 'Password is invalid');
    return res.redirect('/login');
  } else {
    req.session.isLogged = true;
    req.session.userName = user.name;
    req.flash(
      'successfulMessage',
      `Hi ${req.session.userName}! Nice to see you again!`,
    );
    return req.session.save((err) => {
      res.redirect(`../user/${user.name.toLowerCase()}`);
    });
  }
};

exports.postLogout = (req, res) => {
  req.session.destroy((err) => {
    return res.redirect('/');
  });
};
