const express = require('express');
const router = express.Router();
const userNotLogged = require('../../middleware/userNotLogged.js');
const userController = require('../../controllers/budget-expense');

router.get('/:name', userNotLogged, userController.getBudgetExpense);

module.exports = router;
