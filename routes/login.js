const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');
const userLogged = require('../middleware/userLogged');

router.get('/', userLogged, loginController.getLoginPage);

router.get('/user', loginController.getLoggedPage);

router.post('/', loginController.postLoginAuth);

router.post('/logout', loginController.postLogout);

module.exports = router;
