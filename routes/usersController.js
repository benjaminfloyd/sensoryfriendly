var express = require('express');
var router = express.Router();


var Users = require('../models/users');


// Index Users
router.get('/', function(req, res) {
  
  Users.find({})
  .exec(function(err, users) {
    if(err) {
      console.log("Errot finding users:" + err);
      return;
    }

    console.log(users);
    // res.send(users);
    res.render('users/index', {
      users: users
    });
  });
});

// Create new users
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

  Users.findById(userId) 
    .exec(function(err, users) {
      if (err) {
        console.log("Error while retrieving user with ID of " + userId);
                console.log("Error message: " + error);
                return;
      }

      // console.log(users);
      // res.send(users);
      res.render('users/edit', {
        users: users
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
      // res.send('User deleted.');
      // redirect back to the index route
      res.redirect('/users');  
    });
});
module.exports = router;

