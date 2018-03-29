//facebook authentication
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const FacebookAuthModel = require('../../models/facebookAuth.js');

module.exports = function() {

    passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://192.168.0.234:8080/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    FacebookAuthModel.findOrCreate({ facebookId: profile.id, profile: profile.displayName }, function (err, user) {
                console.log("logged in");
                return cb(err, user);
            });
      }
    ));

};
