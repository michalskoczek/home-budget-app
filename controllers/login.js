const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const { loginValidation } = require('../validation');

exports.getLoginPage = (req, res) => {
   res.render('login', {
    pageTitle: 'Home Budget App',
    error: false,
    successfulResgistration: false,
    messageRegistration: 'Your profile has just created!',
  });
}

exports.getLoggedPage = (req, res) => {
  res.render('login', {
    pageTitle: 'Home Budget App',
    error: false,
    successfulResgistration: true,
    messageRegistration: 'Your profile has just created!',
  }); 
}

exports.postLoginAuth = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.render('login', {
    pageTitle: 'Home Budget App',
    successfulResgistration: false,
    error: true,
    messageError: error.details[0].message,
  })

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.render('login', {
    pageTitle: 'Home Budget App',
    successfulResgistration: false,
    error: true,
    messageError: 'Email is not found',
  })

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass){ return res.render('login', {
    pageTitle: 'Home Budget App',
    successfulResgistration: false,
    error: true,
    messageError: 'Password is invalid',
  }) } else {
    return res.redirect('../user/budget')
  }

  const accessToken = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', accessToken).send(accessToken);
};
