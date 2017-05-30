var express = require('express');
var router = express.Router();


var Users = require('../models/users');

var locations = require("../models/locations");

// Index Users (Shows All Users)
router.get('/', function(req, res) {
  
  Users.find({})
  .exec(function(err, users) {
    if(err) {
      console.log("Errot finding users:" + err);
      return;
    }

    // console.log(users);
    // res.send(users);
    res.render('users/index', {
      users: users
    });
  });
});

// Create new users(Form)
router.get('/new', function(req, res) {
  res.render('users/new');
  
});

// create users route
router.post('/', function(req, res) {

  var newUsersForm = req.body;

  var users = new Users({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    username: req.body.username,
    business_name: req.body.location

  });
  users.save(function(err, users) {
    if (err) {
      console.log(err);
      return;
    }

    // console.log(users);
    // res.send(users);
    res.redirect('/users');
  });
});

  // //save the newUser to the db
  // newUser.save(function(error, newUser) {
  //   if(error) {
  //     console.log('error when adding new user: '+error);
  //     return;
  //   }
  //   console.log('new user saved: '+ newUserInfo.name);
  //   //redirect to users index page after saving
  //   response.redirect('/users');
  // })


// Show Users by ID
router.get('/:id', function(req, res) {
  Users.findById(req.params.id)
    .exec(function(err, users) {
      if (err) {
        console.log(err);
        return;
      }

      console.log(users);
      // res.send(users);
      res.render('users/show', {
        users: users

        
      });
    });
  });

/// Edit User
router.get('/edit/:id', function(req, res) {
  var userId = req.params.id;

//  var users = new Users({
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//     email: req.body.email,
//     username: req.body.username,
  // });
  Users.findById(userId) 
    .exec(function(err, user) {
      if (err) {
        console.log("Error while editing of " + userId);
                console.log("Error message: " + error);
                return;
      }

      // console.log(users);
      // res.send(users);
      res.render('users/edit', {
        user: user
      });
    });
});

// USER UPDATE ROUTE
router.put('/:id', function (req
, res) {

    var userId = req
    .params.id;
    var newUserInfo = req
    .body;
    console.log(req.body);

    Users.findByIdAndUpdate(userId, newUserInfo, { new: true })
        .exec(function (error, user) {

            if (error) {
                console.log("Error while updating User with ID of " + userId);
                return;
            }

            res.redirect('/users/' + userId);

        });

});


// delete User
router.delete('/:id', function(req, res) {
  Users.findByIdAndRemove(req.params.id)
    .exec(function(err, author) {
      if (err) {
        console.log(err);
        return;
      }

      console.log('User deleted.');
      
      res.redirect('/users');  
    });
});

// Locations
// Get new from

router.get('/:userId/locations/new', function (req, res) {

    // grab the ID of the user whose Item we would like to edit
    var userId = req.params.userId;

    // then grab the ID of the Item we would like to edit for the User above
    var locationId = req.params.locationId;

    // find the User by ID
    Users.findById(userId)
        .exec(function (error, user) {

            // once we have found the User, find the Item in its' array 
            // of items that matches the Item ID above
            var locationToEdit = user.locations.find(function (location) {
                return location.id === locationId;
            })

            // Once we have found the item we would like to edit, render the 
            // Item edit form with all of the information we would like to put 
            // into the form
            res.render('locations/edit', {
                userId: userId,
                locationId: locationId,
                locationToEdit: locationToEdit
            })
        })

});
// Get Form
router.get('/:userId/locations/:locationId/edit', function (req, res) {

    // grab the ID of the user whose Item we would like to edit
    var userId = req.params.userId;

    // then grab the ID of the Item we would like to edit for the User above
    var locationId = req.params.locationId;

    // find the User by ID
    Users.findById(userId)
        .exec(function (error, user) {

            // once we have found the User, find the Item in its' array 
            // of items that matches the Item ID above
            var locationToEdit = user.locations.find(function (location) {
                return location.id === locationId;
            })

            // Once we have found the item we would like to edit, render the 
            // Item edit form with all of the information we would like to put 
            // into the form
            res.render('locations/edit', {
                userId: userId,
                locationId: locationId,
                locationToEdit: locationToEdit
            })
        })

});
// // ADD A NEW ITEM
router.post('/:userId/locations', function (req, res) {
    // grab the user ID we want to create a new item for
    var userId = req.params.userId;
    // then grab the new Item that we created using the form
    var newLocationName = req.body.business_name;
    // Find the User in the database we want to save the new Item for
    Users.findById(userId)
        .exec(function (err, user) {
            // add a new Item to the User's list of locations, using the data
            // we grabbed off of the form
            user.location.push(new Item({ business_name: newLocationName }));
            // once we have added the new Item to the user's collection 
            // of locations, we can save the user
            user.save(function (err) {
                if (err) {
                    console.log(err);
                    return;
                }
                // once the user has been saved, we can redirect back 
                // to the User's show page, and we should see the new item
                res.redirect('/users/' + userId);
            })
        });
});


// EDIT AN ITEM
router.put('/:userId/locations/:locationId', function (req, res) {

    // find the ID of the user we would like to edit
    var userId = req.params.userId;

    // find the ID of the Item we would like to edit for the User above
    var locationId = req.params.locationId;

    // grab the edited information about the Item from the form
    var editedLocationFromForm = req.body;

    // find the User by ID
    Users.findById(userId)
        .exec(function (error, user) {

            // once we have found the User, find the Item in that user's 
            // collection of Items that matches our Item ID above
            var locationToEdit = user.locations.find(function (location) {
                return location.id === locationId;
            })

            // update the item we would like to edit with the new 
            // information from the form
            locationToEdit.business_name = editedLocationFromForm.business_name;

            // once we have edited the Item, save the user to the database
            user.save(function (error, user) {
                
                // Once we have saved the user with its edited Item, redirect 
                // to the show page for that User. We should see the Item 
                // information updated.
                res.redirect('/users/' + userId)
            });

            
        });
});


module.exports = router;

