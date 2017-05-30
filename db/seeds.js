var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sensoryfriendly');

var Users = require("../models/users");
var location = require('../models/locations');
mongoose.promise = global.Promise;

// clear the database
location.remove({}, function(err){
  console.log(err);
});

Users.remove({}, function(err){
  console.log(err);
});

var benjaminFloyd = new Users({
     first_name: 'Benjamin',
     last_name: 'Floyd',
     email: 'benjaminfloyd@gmail.com',
     username: 'urbandad',
     locations:[{ 
       business_name:"Studio Movie Grill"
      }]
});

// saving the users
benjaminFloyd.save(function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Account created!');
});

