const mongoose = require("mongoose");
var GithubAuthModel = require('../models/githubAuth.js');
var FacebookAuthModel = require('../models/facebookAuth.js');
var User = require('../models/user.js');
//var GoogleAuthModel = require('../models/googleAuth.js');
const passport = require('passport');

module.exports = function(app) {

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
      done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        GoogleAuthModel.findById({_id: new mongoose.mongo.ObjectId(id)}, function(err, user) {
            if(err) return done(err);
            if(user) {
                done(null, user);
            } else {
            FacebookAuthModel.findById({_id: new mongoose.mongo.ObjectId(id)}, function(err, user) {
                if(err) return done(err);
                if(user) {
                  done(null, user);
                } else {
                    GithubAuthModel.findById({_id: new mongoose.mongo.ObjectId(id)}, function(err, user) {
                        if(err) return done(err);
                        if(user) {
                          done(null, user);
                        }
                    });//end of git
                }
            });//end of fb
            }
        });//end of google+
    });//end of deserializeUser

};
