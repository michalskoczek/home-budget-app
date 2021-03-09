exports.getErrorPage = (req, res) => {
  res
    .status(404)
    .render('error-page', { errorPageTitle: 'Error | Home Budget App' });
};
