const mongoose = require("mongoose");
const GithubAuthModel = require('../models/githubAuth.js');
const FacebookAuthModel = require('../models/facebookAuth.js');
const GoogleAuthModel = require('../models/googleAuth.js');
const User = require('../models/user.js');
const passport = require('passport');

module.exports = function(app) {

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
      done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
    //     GoogleAuthModel.findById({_id: new mongoose.mongo.ObjectId(id)}, function(err, user) {
    //         if(err) return done(err);
    //         if(user) {
    //             done(null, user);
    //         } else {
    //         FacebookAuthModel.findById({_id: new mongoose.mongo.ObjectId(id)}, function(err, user) {
    //             if(err) return done(err);
    //             if(user) {
    //               done(null, user);
    //             } else {
                    User.findById({_id: new mongoose.mongo.ObjectId(id)}, function(err, user) {
                        if(err) return done(err);
                        if(user) {
                          done(null, user);
                        }
                    });//end of git
        //         }
        //     });//end of fb
        //     }
        // });//end of google+
    });//end of deserializeUser

};
