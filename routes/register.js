const express = require('express');
const router = express.Router();
const registerController = require('../controllers/register');
const userLogged = require('../middleware/userLogged');

router.get('/', userLogged, registerController.getRegisterHomepage);

router.post('/', registerController.postRegisterForm);

module.exports = router;
