module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      res.header('Expires', '-1');
      res.header('Pragma', 'no-cache');
      return next();
    }
    res.redirect('/')
  },
  ensureGuest: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      res.header('Expires', '-1');
      res.header('Pragma', 'no-cache');
      res.redirect('/dashboard')
    } else {
      return next()
    }
  }
}