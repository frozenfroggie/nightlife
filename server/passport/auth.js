const mongoose = require("mongoose");
var GithubAuthModel = require('../models/githubAuth.js');
var FacebookAuthModel = require('../models/facebookAuth.js');
//var GoogleAuthModel = require('../models/googleAuth.js');
const passport = require('passport');

module.exports = function(app) {
    // mongoose.connect(process.env.MONGO_URI);
    // app.use(session({
    //     store: new MongoStore({mongooseConnection: mongoose.connection}),
    //     saveUninitialized: false,
    //     resave: false,
    //     secret: process.env.SESSION_SECRET
    // }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
      done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        // GoogleAuthModel.findById({_id: new mongoose.mongo.ObjectId(id)}, function(err, user) {
        //     if(err) return done(err);
        //     if(user) {
        //         done(null, user);
        //     } else {
            FacebookAuthModel.findById({_id: new mongoose.mongo.ObjectId(id)}, function(err, user) {
                if(err) return done(err);
                if(user) {
                    done(null, user);
                } else {
                    GithubAuthModel.findById({_id: new mongoose.mongo.ObjectId(id)}, function(err, user) {
                        if(err) return done(err);
                        if(user) {
                            done(null, user);
                        } else {
                          console.log('else');
                        }
                    });//end of git
                }
            });//end of fb
            //}
        //});//end of google+
    });//end of deserializeUser

};
