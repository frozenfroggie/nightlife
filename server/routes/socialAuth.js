const express = require('express');
const router = express.Router();
const passport = require('passport');
const axios = require('axios');
const pick = require('lodash/pick');
const map = require('lodash/map');
const authenticate = require('../middleware/authenticate');
// router.get('/github', function(req,res) {
//   res.redirect(`https://github.com/login/oauth/authorize?scope=user:email&client_id=${process.env.CLIENT_ID}&redirect_uri=https://vast-everglades-58513.herokuapp.com/auth/github/callback`);
// });
// router.get('/github/callback', function(req,response) {
//   const options = {'headers': {'Accept': 'application/json'}};
//   axios.post(`https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&redirect_uri=https://vast-everglades-58513.herokuapp.com&client_secret=${process.env.CLIENT_SECRET}&code=${req.query.code}`, options)
//        .then(res => {
//            axios.get(`https://api.github.com/user?${res.data}`).then(res => {
//              console.log(res.data);
//              response.send(res.data);
//            }).catch(err => {
//              console.log(err);
//            });
//        });
// });

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/' }));

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/', failureFlash: true }));

router.get('/github', passport.authenticate('github'));
router.get('/github/callback', passport.authenticate('github', { successRedirect: '/', failureRedirect: '/', failureFlash: true }));

router.get('/', function(req,res) {
  if(req.isAuthenticated()) {
    const { local, facebook, google, github, bars } = pick(req.user, ['bars', 'local', 'facebook', 'google', 'github']);
    res.send({isAuthenticated: true, user: {bars, local, facebook, google, github}});
  } else {
    res.send({isAuthenticated: false});
  }
});

router.get('/getAccounts', authenticate, function(req,res) {
  try {
    console.log('localUser', req.localUser);
    console.log('socialUser', req.user);
    if(req.localUser && req.isAuthenticated()) {
      const localUser = req.localUser;
      const socialBars = req.user.bars;
      let socialAccount;
      if(req.user.facebook.id) {
        socialAccount = {account: req.user.facebook, type: 'facebook'};
      } else if(req.user.github.id) {
        socialAccount = {accout: req.user.github, type: 'github'};
      } else if(req.user.google.id) {
        socialAccount = {accout: req.user.google, type: 'google'};
      }
      // bars = bars.filter( bar => {
      //   return localUser.bars && bars.forEach( localBar => {
      //     return bar.id !== localBar.id
      //   });
      // });
      console.log(JSON.stringify(socialAccount, null, 4));
      localUser.findByIdAndUpdate(localUser._id, {$set: {[socialAccount.type]: socialAccount.account}}, {new: true}).then(user => {
        res.send({user, refreshToken: req.refreshToken});
      }).catch(err => res.status(400).send(err));

    }
  } catch(err) {
    console.log(err);
    res.send(err);
  }
});

router.delete('/logout', function(req,res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
