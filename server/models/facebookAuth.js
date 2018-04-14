// // The FacebookAuth model
// var mongoose = require("mongoose");
// var Schema = mongoose.Schema;
// const findOrCreate = require('mongoose-findorcreate');
//
// var facebookAuthSchema = new Schema({
//   id: String,
//   displayName: String,
//   username: String,
//   email: String,
//   isVerified: Boolean,
//   bars: []
// }, {
//   collection : 'facebookAuth'
// });
//
// facebookAuthSchema.plugin(findOrCreate);
//
// module.exports = mongoose.model('FacebookAuth', facebookAuthSchema);
