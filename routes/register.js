const express = require('express');
const router = express.Router();

const registerController = require('../controllers/register');

router.get('/', registerController.getRegisterHomepage);

router.post('/', registerController.postRegisterForm);

router.post('/auth', registerController.postRegisterAuth);

module.exports = router;
