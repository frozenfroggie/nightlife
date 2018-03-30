// The GithubAuth model
var mongoose = require("mongoose");
var Schema = mongoose.Schema
const jwt = require('jsonwebtoken');
const findOrCreate = require('mongoose-findorcreate');

var GithubAuthSchema = new Schema({
  id: String,
  username: String,
  email: String,
  isVerified: Boolean,
  bars: []
}, {
  collection : 'githubAuth'
});

GithubAuthSchema.plugin(findOrCreate);

GithubAuthSchema.methods.generateAndSaveTokens = function() {
  const user = this;
  console.log('model', user);
  const authTokenExpirationTime = 60;
  const authToken = jwt.sign({_id: user._id.toHexString(), email: user.email, username: user.username, access: 'auth'}, process.env.JWT_SECRET_1, {
    expiresIn: authTokenExpirationTime
  });

  const refreshTokenExpirationTime = '5d';
  const refreshToken = jwt.sign({_id: user._id.toHexString(), access: 'refresh'}, process.env.JWT_SECRET_2, {
    expiresIn: refreshTokenExpirationTime
  });

  user.tokens = {authToken, refreshToken};
  return user.save().then(() => user.tokens);
};

module.exports = mongoose.model('GithubAuth', GithubAuthSchema);
