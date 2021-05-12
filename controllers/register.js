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
  if (error)
    return res.render('register', {
      error: true,
      path: '/register',
      messageError: error.details[0].message,
      pageTitle: 'Home Budget App',
      successfulResgistration: false,
      isLogged: req.session.isLogged,
    });

  const existName = await User.findOne({ name: req.body.name });
  if (existName)
    return res.render('register', {
      error: true,
      path: '/register',
      messageError: 'Name exists, please use another name.',
      pageTitle: 'Home Budget App',
      successfulResgistration: false,
      isLogged: req.session.isLogged,
    });

  const existEmail = await User.findOne({ email: req.body.email });
  if (existEmail)
    return res.render('register', {
      error: true,
      path: '/register',
      messageError: 'Email exists, please use another email.',
      pageTitle: 'Home Budget App',
      successfulResgistration: false,
      isLogged: req.session.isLogged,
    });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    const savedUser = await user.save();
    res.redirect('../login/user');
  } catch (err) {
    res.status(400).send(err);
  }
};
