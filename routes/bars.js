const express = require('express'),
      router  = express.Router(),
      Bar     = require('../models/bars');

router.get('/bars', isLoggedIn, (req, res) => {
  Bar.find({}, (err, bars) => {
    if(err) {
      console.log(err);
    } else {
      res.render("bars/bars", {bars:bars, currentUser: req.user});
    }
  });
});

router.post('/bars', isLoggedIn, (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let description = req.body.description;
  let newBar = {name: name, image: image, description: description};
  Bar.create(newBar, (err, newlyCreated) => {
    if(err) {
      console.log(err);
    } else {
      res.redirect("/bars");
    }
  });
});

router.get('/bars/new', isLoggedIn, (req, res) => {
  res.render("bars/new_bar");
});

router.get('/bars/:id', isLoggedIn, (req, res) => {
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
  res.redirect('/login');
};

module.exports = router;
