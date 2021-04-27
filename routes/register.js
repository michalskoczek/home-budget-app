const express = require('express');
const router = express.Router();
const registerController = require('../controllers/register');

router.get('/', registerController.getRegisterHomepage);

router.post('/', registerController.postRegisterForm);

module.exports = router;
