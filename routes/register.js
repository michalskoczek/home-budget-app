const express = require('express');
const router = express.Router();
const User = require('../model/User');
const { registerValidation } = require('../validation');

router.post('/', async (req, res) => {
  const validation = schema.validate(req.body);
  res.send(validation);

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
