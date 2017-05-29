
var Schema = require("../db/schema");
var mongoose = require('mongoose');

var Location = Schema.Location;
module.exports = Location;



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

// module.exports = mongoose.model("Locations", LocationsSchema);
