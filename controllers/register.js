const bcrypt = require('bcryptjs');
const User = require('../model/User');
const { registerValidation } = require('../validation');

exports.getRegisterHomepage = (req, res) => {
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

  res.render('register', {
    pageTitle: 'Home Budget App',
    path: '/register',
    isLogged: req.session.isLogged,
    userName: req.session.userName,
    errorMessageFlash: messagesFlash.errorMessage,
    successfulMessageFlash: messagesFlash.successfulMessage,
  });
};

exports.postRegisterForm = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    req.flash('errorMessage', `${error.details[0].message}`);
    return res.redirect('/register');
  }

  const existName = await User.findOne({ name: req.body.name });
  if (existName) {
    req.flash('errorMessage', 'Name exists, please use another name.');
    return res.redirect('/register');
  }

  const existEmail = await User.findOne({ email: req.body.email });
  if (existEmail) {
    req.flash('errorMessage', 'Email exists, please use another email.');
    return res.redirect('/register');
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    const savedUser = await user.save();
    req.flash('successfulMessage', 'Your profile has just created!');
    res.redirect('../login/user');
  } catch (err) {
    res.status(400).send(err);
  }
};
