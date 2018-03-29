// The GithubAuth model
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const findOrCreate = require('mongoose-findorcreate');

var githubAuthSchema = new Schema({
  githubId: String,
  profile: String
}, {
  collection : 'githubAuth'
});

githubAuthSchema.plugin(findOrCreate);

module.exports = mongoose.model('GithubAuth', githubAuthSchema);
