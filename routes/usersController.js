var express = require('express');
var router = express.Router();


var Users = require('../models/users');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// Index Users
router.get('/', function(req, res) {
  // res.send('Users here');
  Users.find({})
  .exec(function(err, users) {
    if(err) {
      console.log(err);
      return;
    }

    console.log(users);
    // res.send(users);
    res.render('users/index', {
      users: users
    });
  });
});

// new users
router.get('/new', function(req, res) {
  res.render('users/new');
  
});

// show users
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
  
// create users
router.post('/', function(req, res) {
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

module.exports = router;

