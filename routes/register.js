const express = require('express');
const router = express.Router();
const User = require('../model/User');

router.post('/', (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  user.save();
});

module.exports = router;
