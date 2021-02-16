const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation');

router.post('/', async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const existEmail = await User.findOne({ email: req.body.email });
  if (existEmail) return res.status(400).send('Email exists');

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({ userId: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
