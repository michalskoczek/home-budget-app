const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access denied');

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(400).send('Invalid Token');
    req.user = user;
    next();
  });
}

module.exports = authenticate;
