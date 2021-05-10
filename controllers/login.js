const bcrypt = require('bcryptjs');
const User = require('../model/User');
const { loginValidation } = require('../validation');

exports.getLoginPage = (req, res) => {
  res.render('login', {
    pageTitle: 'Home Budget App',
    path: '/login',
    error: false,
    successfulResgistration: false,
    messageRegistration: 'Your profile has just created!',
    userName: req.session.userName,
  });
};

exports.getLoggedPage = (req, res) => {
  res.render('login', {
    pageTitle: 'Home Budget App',
    path: '/login',
    error: false,
    successfulResgistration: true,
    messageRegistration: 'Your profile has just created!',
  });
};

exports.postLoginAuth = async (req, res) => {
  const { error } = loginValidation(req.body);

  if (error)
    return res.render('login', {
      pageTitle: 'Home Budget App',
      path: '/login',
      successfulResgistration: false,
      error: true,
      messageError: error.details[0].message,
    });

  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.render('login', {
      pageTitle: 'Home Budget App',
      path: '/login',
      successfulResgistration: false,
      error: true,
      messageError: 'Email is not found',
    });

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.render('login', {
      pageTitle: 'Home Budget App',
      path: '/login',
      successfulResgistration: false,
      error: true,
      messageError: 'Password is invalid',
    });
  } else {
    req.session.isLogged = true;
    req.session.userId = user._id;
    req.session.userName = user.name;
    return req.session.save((err) => {
      console.log(err);
      res.redirect('../user/budget');
    });
  }
};

exports.postLogout = (req, res) => {
  req.session.destroy((err) => {
    console.log(err);
    return res.redirect('/');
  });
};
