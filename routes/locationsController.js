var express = require('express');
var router = express.Router();

router.get('/', function (request, response) {
    response.redirect('/users');
});

module.exports = router;

//  Reach Goal
// var express = require('express');
// var router = express.Router();


// var Locations = require('../models/locations');

// // Index Locations (Shows All Locations)
// router.get('/', function(req, res) {
  
//   Locations.find({})
//   .exec(function(err, locations) {
//     if(err) {
//       console.log("Error finding business:" + err);
//       return;
//     }

//     // console.log(locations);
//     // res.send(locations);
//     res.render('locations/index', {
//       locations: locations
//     });
//   });
// });

// module.exports = router;