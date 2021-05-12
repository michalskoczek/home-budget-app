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

  if (error)
    return res.render('login', {
      pageTitle: 'Home Budget App',
      path: '/login',
      successfulResgistration: false,
      error: true,
      messageError: error.details[0].message,
    });

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    req.flash('errorMessage', 'Invalid email');
    // return res.render('login', {
    //   pageTitle: 'Home Budget App',
    //   path: '/login',
    //   successfulResgistration: false,
    //   error: true,
    //   messageError: 'Email is not found',
    //   errorMessageFlash: req.flash('errorMessage'),
    // });

    return res.redirect('/login');
  }

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.render('login', {
      pageTitle: 'Home Budget App',
      path: '/login',
      successfulResgistration: false,
      error: true,
      messageError: 'Password is invalid',
      errorMessageFlash: '',
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
