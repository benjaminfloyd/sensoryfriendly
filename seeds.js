var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sensoryfriendly');

var Users = require("./models/users");

mongoose.promise = global.Promise;

// Users.remove({}, function(err, users) {
//   console.log(err);
// });

var benjaminFloyd = new Users({
     first_name: 'Benjamin',
     last_name: 'Floyd',
     username: 'urbandad',
     email: 'benjaminfloyd@gmail.com',
});

// var fforde = new Users({
//   first_name: 'Jasper',
//   last_name: 'Fforde',
//   country: 'England',
//   book_title: 'The Eyre Affair',
//   publication_year: '2001'
// });

// var willig = new Users({
//   first_name: 'Lauren',
//   last_name: 'Willig',
//   country: 'United States',
//   book_title: 'The Secret History of the Pink Carnation',
//   publication_year: '2000'
// });

// var lutz = new Users({
//   first_name: 'Lisa',
//   last_name: 'Lutz',
//   country: 'United States',
//   book_title: 'The Spellman Files: A Novel',
//   publication_year: '2007'
// });

benjaminFloyd.save(function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Account created!');
});

// fforde.save(function(err) {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   console.log('Fforde created!');
// });

// willig.save(function(err) {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   console.log('Willig created!');
// });

// lutz.save(function(err) {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   console.log('Lutz created!');
// });
