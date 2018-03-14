const passport = require('passport');

module.exports = app => {
  app.post('/auth/local', passport.authenticate('local'), (req, res) => {
    res.send(req.user);
  });

  app.post('/auth/local/signup', passport.authenticate('local-signup'), function(req, res) {
    console.log(req.user);
    res.redirect('/');
  });

  app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }), (req, res) => res.redirect('/'));

  app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/');
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
