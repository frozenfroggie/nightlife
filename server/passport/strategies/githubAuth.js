//github authentication
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const GithubAuthModel = require('../../models/githubAuth.js');
const pick = require('lodash/pick');

module.exports = function() {

  passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "https://vast-everglades-58513.herokuapp.com/socialAuth/github/callback"
      },
      function(accessToken, refreshToken, profile, cb) {
        console.log(profile);
        const { id, displayName, username, emails } = pick(profile, ['id', 'displayName', 'username', 'emails']);
        GithubAuthModel.findOrCreate({ id, displayName, username, email: emails[0].value, isVerified: true }, function (err, user) {
          console.log("logged in");
          return cb(err, user);
        });
      }));

};
