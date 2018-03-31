//facebook authentication
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GoogleAuthModel = require('../../models/googleAuth.js');
const pick = require('lodash/pick');

module.exports = function() {

  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://vast-everglades-58513.herokuapp.com/socialAuth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      console.log(profile);
      const { id, displayName, username, emails } = pick(profile, ['id', 'displayName', 'username', 'emails']);
      GoogleAuthModel.findOrCreate({ id, displayName, username, email: emails[0].value, isVerified: true }, function (err, user) {
        if(err) return cb(err);
        console.log("logged in");
        return cb(err,user);
      });
    }
  ));

};
