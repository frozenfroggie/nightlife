// The FacebookAuth model
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const findOrCreate = require('mongoose-findorcreate');

var facebookAuthSchema = new Schema({
  facebookId: String,
  profile: String
}, {
  collection : 'facebookAuth'
});

facebookAuthSchema.plugin(findOrCreate);

module.exports = mongoose.model('FacebookAuth', facebookAuthSchema);
