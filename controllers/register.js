const bcrypt = require('bcryptjs');
const User = require('../model/User');
const { registerValidation } = require('../validation');

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
      messageError: error.details[0].message,
      pageTitle: 'Home Budget App',
      successfulResgistration: false,
    });

  const existEmail = await User.findOne({ email: req.body.email });
  if (existEmail)
    return res.render('register', {
      error: true,
      messageError: 'Email exists',
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
