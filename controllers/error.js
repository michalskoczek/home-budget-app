exports.getErrorPage = (req, res) => {
  res.status(404).render('error-page', {
    errorPageTitle: 'Error | Home Budget App',
    path: '/',
    isLogged: req.session.isLogged,
    userName: req.session.userName,
  });
};
