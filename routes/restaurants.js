const express = require('express'),
      router  = express.Router(),
      Restaurant = require('../models/restaurants');

router.get('/', isLoggedIn, (req, res) => {
  Restaurant.find({}, (err, restaurants) => {
    if(err) {
      console.log(err);
    } else {
      res.render("restaurants/restaurants", {restaurants:restaurants, currentUser: req.user});
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
  let newRestaurant = {name: name, image: image, description: description, author: author};
  // console.log(req.user);
  Restaurant.create(newRestaurant, (err, newlyCreated) => {
    if(err) {
      console.log(err);
    } else {
      console.log(newlyCreated);
      res.redirect("/restaurants");
    }
  });
});

router.get('/new', isLoggedIn, (req, res) => {
  res.render("restaurants/new_restaurant");
});

router.get('/:id', isLoggedIn, (req, res) => {
  Restaurant.findById(req.params.id).populate("comments").exec((err, foundRestaurant) => {
    if(err){
      console.log(err);
    } else {
      console.log(foundRestaurant);
      res.render("restaurants/show", {restaurant: foundRestaurant});
    }
  });
});

// EDIT ROUTE

router.get('/:id/edit', isLoggedIn, (req, res) => {
  Restaurant.findById(req.params.id, (err, foundRestaurant) => {
    if(err) {
      res.redirect("/restaurants");
    } else {
      res.render("restaurants/edit", {restaurant: foundRestaurant});
    }
  });
});

// UPDATE ROUTE

router.put('/:id', isLoggedIn, (req, res) => {
  Restaurant.findByIdAndUpdate(req.params.id, req.body.restaurant, (err, updatedRestaurant) => {
    if(err) {
      res.redirect("/restaurants");
    } else {
      res.redirect(`/restaurants/${req.params.id}`);
    }
  });
});

// DESTROY restaurant ROUTE

router.delete('/:id', (req, res) => {
  Restaurant.findByIdAndRemove(req.params.id, (err) => {
    if(err) {
      res.redirect("/restaurants");
    } else {
      res.redirect("/restaurants");
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
