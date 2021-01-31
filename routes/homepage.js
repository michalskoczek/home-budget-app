const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('main-router');
});

module.exports = router;
