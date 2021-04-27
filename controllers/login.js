const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const { loginValidation } = require('../validation');

exports.postLoginAuth = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Email is not found');

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Password is invalid');

  const accessToken = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', accessToken).send(accessToken);
};
