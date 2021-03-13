const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('user/budget-expense', {
    pageTitle: 'Home Budget App',
    budget: true,
  });
});

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  res.redirect('/');
});

module.exports = router;
