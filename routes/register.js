const express = require('express');
const router = express.Router();
const User = require('../model/User');
const { registerValidation } = require('../validation');

router.post('/', async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  /* const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  } */
});

module.exports = router;
