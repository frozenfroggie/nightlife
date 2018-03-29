//github authentication
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const GithubAuthModel = require('../../models/githubAuth.js');

module.exports = function() {

    passport.use(new GitHubStrategy({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: "http://192.168.0.234:8080/auth/github/callback"
        },
        function(accessToken, refreshToken, profile, cb) {
            console.log(profile.displayName);
            GithubAuthModel.findOrCreate({ githubId: profile.id, profile: profile.displayName }, function (err, user) {
                console.log("logged in");
                return cb(err, user);
            });
        }));

};
