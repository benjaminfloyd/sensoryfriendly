
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// mongoose.promise = global.Promise;

var UserSchema = new Schema({
  first_name: String,
  last_name: String,
  username: String,
  email: String,
});

UserSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

UserSchema.virtual('fullName').get(function () {
  return this.first_name + ' ' + this.last_name;
});

module.exports = mongoose.model("Users", UserSchema);
