const express = require('express');
const router = express.Router();
// const authenticate = require('.././authenticate');
const loginController = require('../controllers/login');

router.get('/', loginController.getLoginPage);

router.get('/user', loginController.getLoggedPage);

router.post('/', loginController.postLoginAuth);

router.post('/logout', loginController.postLogout);

module.exports = router;
