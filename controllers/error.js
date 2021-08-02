exports.getErrorPage = (req, res) => {
  res.status(404).render('error-page', {
    errorPageTitle: 'Error | Home Budget App',
    path: '/',
    isLogged: req.session.isLogged,
    userName: req.session.userName,
  });
};

exports.getError500Page = (req, res) => {
  res.status(500).render('error-500-page', {
    errorPageTitle: 'Error | Home Budget App',
    path: '/',
    isLogged: req.session.isLogged,
    userName: req.session.userName,
  });
};
