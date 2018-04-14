//facebook authentication
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GoogleAuthModel = require('../../models/googleAuth.js');
const pick = require('lodash/pick');
const User = require('../../models/user.js');

module.exports = function() {

  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://vast-everglades-58513.herokuapp.com/socialAuth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      const { id, displayName, emails } = pick(profile, ['id', 'displayName', 'emails']);
      console.log(id, displayName, emails);
      User.findOrCreate({ 'google.id': id, 'google.displayName': displayName, 'google.email': emails[0].value }, function (err, user) {
        console.log("logged in");
        return cb(err,user);
      });
      console.log('profile', JSON.stringify(profile, null, 4));
    }
  ));

  //
  // passport.use(new GoogleStrategy({
  //     clientID: process.env.GOOGLE_CLIENT_ID,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  //     callbackURL: "https://vast-everglades-58513.herokuapp.com/connect/google/callback",
  //     passReqToCallback: true
  //   },
  //   function(req, accessToken, refreshToken, profile, cb) {
  //     console.log('CONNECT profile', JSON.stringify(profile, null, 4));
  //     // if(!req.user) {
  //     //   const { id, displayName, username, emails } = pick(profile, ['id', 'displayName', 'username', 'emails']);
  //     //   User.findOrCreate({ 'google.id': id, 'google.displayName': displayName, 'google.username': username, 'google.email': emails[0].value }, function (err, user) {
  //     //     console.log("logged in");
  //     //     return cb(err,user);
  //     //   });
  //     //   console.log(profile);
  //     // } else {
  //     //   let user = req.user;
  //     //   user.google.id = profile.id;
  //     //   user.google.displayName = profile.displayName;
  //     //   user.google.username = profile.username;
  //     //   user.google.email = profile.email;
  //     //   console.log('berfore update', user);
  //     //   User.findByIdAndUpdate(req.user._id, {$set: {google: user.google}}, {new: true})
  //     //       .then(user => {
  //     //         console.log('after update', user);
  //     //         return cb(null,user);
  //     //   }).catch(err => cb(err));
  //     // }
  //   }
  // ));

};
