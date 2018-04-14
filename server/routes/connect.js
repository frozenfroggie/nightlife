const express = require('express');
const router = express.Router();
const passport = require('passport');
const authenticate = require('../middleware/authenticate');

router.get('/google', passport.authorize('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authorize('google', { failureRedirect: '/', successRedirect: '/connect' }),
  function(req, res) {
    var user = req.user;
    var account = req.account;
    console.log('buu?');
    console.log('user', user);
    console.log('account', account);
    // Associate the Twitter account with the logged-in user.
    // account.userId = user.id;
    // account.save(function(err) {
    //   if (err) { return self.error(err); }
    //   self.redirect('/');
    // });
  }
);

router.get('/', function(req, res) {
  console.log('into connect!');
  console.log(req);
});

router.get('/facebook', authenticate, passport.authorize('facebook', { scope: ['email'] }));

router.get('/github', authenticate, passport.authorize('github'));

module.exports = router;
