
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// mongoose.promise = global.Promise;

var LocationsSchema = new Schema({
  business_name: String,
  phone_Number: String,
  web_address: String,
//   type:[{}]
});

LocationsSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

LocationsSchema.virtual('fullName').get(function () {
  return this.first_name + ' ' + this.last_name;
});

module.exports = mongoose.model("Locations", LocationsSchema);.exports = LocationsSchema;