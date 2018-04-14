// // The GoogleAuth model
// var mongoose = require("mongoose");
// var Schema = mongoose.Schema;
// const findOrCreate = require('mongoose-findorcreate');
//
// var googleAuthSchema = new Schema({
//   id: String,
//   displayName: String,
//   username: String,
//   email: String,
//   isVerified: Boolean,
//   bars: []
// }, {
//   collection : 'googleAuth'
// });
//
// googleAuthSchema.plugin(findOrCreate);
//
// module.exports = mongoose.model('GoogleAuth', googleAuthSchema);
