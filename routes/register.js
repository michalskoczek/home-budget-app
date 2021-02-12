const express = require('express');
const router = express.Router();
const User = require('../model/User');

const schema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(1024).required(),
  confirmPassword: Joi.ref('password'),
});

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
