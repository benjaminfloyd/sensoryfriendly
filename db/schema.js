var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var db = mongoose.connection;

mongoose.promise = global.Promise;


var LocationSchema = new Schema({
  business_name: String
});

// Reach Goal
// var LocationSchema = new Schema({
//   business_name: String,
//   phone_Number: String,
//   web_address: String,
// //   type:[{}]
// });

// LocationSchema.pre('save', function(next){
//   now = new Date();
//   this.updated_at = now;
//   if ( !this.created_at ) {
//     this.created_at = now;
//   }
//   next();
// });

// LocationSchema.virtual('fullName').get(function () {
//   return this.first_name + ' ' + this.last_name;
// });


var UserSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  username: String, 
  locations: [LocationSchema]
});

UserSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

var UserModel = mongoose.model("User", UserSchema);
var LocationModel = mongoose.model("Location", LocationSchema);

module.exports = {
  User: UserModel,
  Location: LocationModel
};
