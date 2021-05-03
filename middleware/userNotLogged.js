function userNotLogged(req, res, next) {
  if (!req.session.isLogged) {
    return res.redirect('/');
  }
  next();
}

module.exports = userNotLogged;
