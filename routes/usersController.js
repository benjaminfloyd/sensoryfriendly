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

// // ADD A NEW ITEM
router.post('/:userId/locations', function (request, response) {
    // grab the user ID we want to create a new item for
    var userId = request.params.userId;
    // then grab the new Item that we created using the form
    var newItemName = request.body.business_name;
    // Find the User in the database we want to save the new Item for
    Users.findById(userId)
        .exec(function (err, user) {
            // add a new Item to the User's list of locations, using the data
            // we grabbed off of the form
            user.locations.push(new Item({ business_name: newItemName }));
            // once we have added the new Item to the user's collection 
            // of locations, we can save the user
            user.save(function (err) {
                if (err) {
                    console.log(err);
                    return;
                }
                // once the user has been saved, we can redirect back 
                // to the User's show page, and we should see the new item
                response.redirect('/users/' + userId);
            })
        });
});


module.exports = router;

