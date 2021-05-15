const express = require('express');
const router = express.Router();
const userNotLogged = require('../../middleware/userNotLogged.js');
const userController = require('../../controllers/user-page');

router.get('/:name', userNotLogged, userController.getBudgetExpense);

router.post('/:name/budget', userController.postBudgetAmount);

module.exports = router;
