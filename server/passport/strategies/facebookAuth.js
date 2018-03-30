//facebook authentication
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const FacebookAuthModel = require('../../models/facebookAuth.js');
const pick = require('lodash/pick');

module.exports = function() {

    passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: `${process.env.DOMAIN}/socialAuth/facebook/callback`
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    const { id, displayName, username, emails } = pick(profile, ['id', 'displayName', 'username', 'emails']);
    FacebookAuthModel.findOrCreate({ id, displayName, username, email: emails[0].value, isVerified: true }, function (err, user) {
                console.log("logged in");
                return cb(err, user);
            });
      }
    ));

};
