var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sensoryfriendly');

var Users = require("./models/users");
// var Item = require('../models/item');
mongoose.promise = global.Promise;


// Item.remove({}, function(err){
//   console.log(err);
// });
User.remove({}, function(err){
  console.log(err);
});

var benjaminFloyd = new Users({
     first_name: 'Benjamin',
     last_name: 'Floyd',
     username: 'urbandad',
     email: 'benjaminfloyd@gmail.com',
    //  business:[{ name:""}]
});

// saving the users
benjaminFloyd.save(function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Account created!');
});

