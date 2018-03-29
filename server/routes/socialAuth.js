const express = require('express');
const router = express.Router();
const passport = require('passport');

const axios = require('axios');
router.get('/github', function(req,res) {
  res.redirect(`https://github.com/login/oauth/authorize?scope=user:email&client_id=${process.env.CLIENT_ID}&redirect_uri=http://192.168.0.234:8080/auth/github/callback`);
});
router.get('/github/callback', function(req,response) {
  const options = {'headers': {'Accept': 'application/json'}};
  axios.post(`https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&redirect_uri=http://192.168.0.234:8080/auth/github/callback&client_secret=${process.env.CLIENT_SECRET}&code=${req.query.code}`, options)
       .then(res => {
           axios.get(`https://api.github.com/user?${res.data}`).then(res => {
             console.log(res.data);
             response.send(res.data);
           }).catch(err => {
             console.log(err);
           });
       });
});

// router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
// router.get('/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/' }));

router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/', failureFlash: true }));
//
// router.get('/github', passport.authenticate('github'));
// router.get('/github/callback', passport.authenticate('github', { successRedirect: '/', failureRedirect: '/', failureFlash: true }));

module.exports = router;