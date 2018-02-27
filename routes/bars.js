const express = require('express'),
      router  = express.Router(),
      Bar     = require('../models/bars');

router.get('/', isLoggedIn, (req, res) => {
  Bar.find({}, (err, bars) => {
    if(err) {
      console.log(err);
    } else {
      res.render("bars/bars", {bars:bars, currentUser: req.user});
    }
  });
});

router.post('/', isLoggedIn, (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let description = req.body.description;
  let author = {
    id: req.user._id,
    username: req.user.username
  };
  let newBar = {name: name, image: image, description: description, author: author};
  Bar.create(newBar, (err, newlyCreated) => {
    if(err) {
      console.log(err);
    } else {
      console.log(newlyCreated);
      res.redirect("/bars");
    }
  });
});

router.get('/new', isLoggedIn, (req, res) => {
  res.render("bars/new_bar");
});

router.get('/:id', isLoggedIn, (req, res) => {
  Bar.findById(req.params.id).populate("comments").exec((err, foundBar) => {
    if(err){
      console.log(err);
    } else {
      console.log(foundBar);
      res.render("bars/show", {bar: foundBar});
    }
  });
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

module.exports = router;
