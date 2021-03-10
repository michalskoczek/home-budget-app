const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('user/budget-expense', { pageTitle: 'Home Budget App' });
});

module.exports = router;
