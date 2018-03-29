// The GoogleAuth model
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const findOrCreate = require('mongoose-findorcreate');

var googleAuthSchema = new Schema({
  facebookId: String,
  profile: String
}, {
  collection : 'googleAuth'
});

googleAuthSchema.plugin(findOrCreate);

module.exports = mongoose.model('GoogleAuth', googleAuthSchema);
