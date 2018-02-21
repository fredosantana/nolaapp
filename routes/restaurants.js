const express = require('express'),
      router  = express.Router(),
      Restaurant = require('../models/restaurants');

router.get('/restaurants', isLoggedIn, (req, res) => {
  Restaurant.find({}, (err, restaurants) => {
    if(err) {
      console.log(err);
    } else {
      res.render("restaurants/restaurants", {restaurants:restaurants, currentUser: req.user});
    }
  });
});

router.post('/restaurants', isLoggedIn, (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let description = req.body.description;
  let newRestaurant = {name: name, image: image, description: description};
  Restaurant.create(newRestaurant, (err, newlyCreated) => {
    if(err) {
      console.log(err);
    } else {
      res.redirect("/restaurants");
    }
  });
});

router.get('/restaurants/new', isLoggedIn, (req, res) => {
  res.render("restaurants/new_restaurant");
});

router.get('/restaurants/:id', isLoggedIn, (req, res) => {
  Restaurant.findById(req.params.id).populate("comments").exec((err, foundRestaurant) => {
    if(err){
      console.log(err);
    } else {
      console.log(foundRestaurant);
      res.render("restaurants/show", {restaurant: foundRestaurant});
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
