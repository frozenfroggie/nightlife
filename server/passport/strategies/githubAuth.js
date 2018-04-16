const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const GithubAuthModel = require('../../models/githubAuth.js');
const pick = require('lodash/pick');
const User = require('../../models/user.js');

module.exports = function() {

  passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "https://vast-everglades-58513.herokuapp.com/socialAuth/github/callback",
        passReqToCallback: true
      },
      function(req, accessToken, refreshToken, profile, cb) {
        console.log('req', req);
        console.log('git', profile);
        const { id, displayName, emails } = pick(profile, ['id', 'displayName', 'emails']);
        User.findOrCreate({ 'github.id': id, 'github.displayName': displayName, 'github.email': emails[0].value }, function (err, user) {
          console.log("logged in", user);
          return cb(err, user);
        });
      }
    ));
};
