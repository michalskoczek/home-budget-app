const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation');

exports.getRegisterHomepage = (req, res) => {
  res.render('register', {
    pageTitle: 'Home Budget App',
    error: false,
    successfulResgistration: false,
  });
};

exports.postRegisterForm = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error)
    return res.render('register', {
      error: true,
      message: error.details[0].message,
      pageTitle: 'Home Budget App',
      successfulResgistration: false,
    });

  const existEmail = await User.findOne({ email: req.body.email });
  if (existEmail)
    return res.render('register', {
      error: true,
      message: 'Email exists',
      pageTitle: 'Home Budget App',
      successfulResgistration: false,
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

exports.postRegisterAuth = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Email is not found');

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Password is invalid');

  const accessToken = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', accessToken).send(accessToken);
};
