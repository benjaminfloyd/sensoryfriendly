var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sensoryfriendly');

var Users = require("./models/users");

mongoose.promise = global.Promise;


User.remove({}, function(err){
  console.log(err);
});

var benjaminFloyd = new Users({
     first_name: 'Benjamin',
     last_name: 'Floyd',
     username: 'urbandad',
     email: 'benjaminfloyd@gmail.com',
     business:[{ name:""}]
});

benjaminFloyd.save(function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Account created!');
});

