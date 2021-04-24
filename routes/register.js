const express = require('express');
const router = express.Router();
const authenticate = require('.././authenticate');
const registerController = require('../controllers/register');

router.get('/', registerController.getRegisterHomepage);

router.post('/', registerController.postRegisterForm);

router.post('/auth', authenticate, registerController.postRegisterAuth);

module.exports = router;
