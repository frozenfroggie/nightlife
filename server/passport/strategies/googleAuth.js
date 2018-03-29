//facebook authentication
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const GoogleAuthModel = require('../../models/googleAuth.js');

module.exports = function() {

  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://192.168.0.234:8080/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      GoogleAuthModel.findOrCreate({ googleId: profile.id, profile: profile.displayName }, function (err, user) {
        if(err) return cb(err);
        console.log("logged in");
        return cb(err,user);
      });
    }
  ));

};
