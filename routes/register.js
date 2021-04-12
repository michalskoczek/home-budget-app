const express = require('express');
const router = express.Router();

const registerController = require('../controllers/register');

router.get('/', registerController.getRegisterHomepage);

router.post('/', registerController.postRegisterForm);

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

router.post('/auth', async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Email is not found');

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Password is invalid');

  const accessToken = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', accessToken).send(accessToken);
});

module.exports = router;
