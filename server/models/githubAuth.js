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

module.exports = mongoose.model('GithubAuth', GithubAuthSchema);
