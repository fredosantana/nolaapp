const express = require('express'),
      router  = express.Router(),
      Restaurant = require('../models/restaurants'),
      middleware = require('../middleware');

router.get('/', middleware.isLoggedIn, (req, res) => {
  Restaurant.find({}, (err, restaurants) => {
    if(err) {
      console.log(err);
    } else {
      res.render("restaurants/restaurants", {restaurants:restaurants, currentUser: req.user});
    }
  });
});

router.post('/', middleware.isLoggedIn, (req, res) => {
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

router.get('/new', middleware.isLoggedIn, (req, res) => {
  res.render("restaurants/new_restaurant");
});

router.get('/:id', middleware.isLoggedIn, (req, res) => {
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

router.get('/:id/edit', middleware.isThisYourRestaurant, (req, res) => {
  Restaurant.findById(req.params.id, (err, foundRestaurant) => {
    res.render("restaurants/edit", {restaurant: foundRestaurant});
  });
});

// UPDATE ROUTE

router.put('/:id', middleware.isThisYourRestaurant, (req, res) => {
  Restaurant.findByIdAndUpdate(req.params.id, req.body.restaurant, (err, updatedRestaurant) => {
    if(err) {
      res.redirect("/restaurants");
    } else {
      res.redirect(`/restaurants/${req.params.id}`);
    }
  });
});

// DESTROY restaurant ROUTE

router.delete('/:id', middleware.isThisYourRestaurant, (req, res) => {
  Restaurant.findByIdAndRemove(req.params.id, (err) => {
    if(err) {
      res.send("The problem is here");
    } else {
      res.redirect("/restaurants");
    }
  });
});

module.exports = router;
