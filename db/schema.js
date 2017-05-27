var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var db = mongoose.connection;

mongoose.promise = global.Promise;


var LocationsSchema = new Schema({
  name: String
});

var UserSchema = new Schema({
  first_name: String,
  last_name: String,
  username: String,
  email: { type: String, required: true, unique: true },
  created_at: Date,
  updated_at: Date,
  locations: [LocationsSchema]
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
var LocationsModel = mongoose.model("Locations", LocationsSchema);



// CONNECTION EVENTS
db.once('open', function() {
  console.log("Opened mongoose.");
});

db.once('close', function() {
  console.log("Closed mongoose.");
});

db.on('connected', function() {
  console.log('Mongoose connected to ' + db.host + ':' + db.port + '/' + db.name);
});

db.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});

db.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

// module.exports = db;
module.exports = {
  User: UserModel,
  Locations: LocationsModel
};