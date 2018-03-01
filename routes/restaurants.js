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

router.get('/:id/edit', isThisYourRestaurant, (req, res) => {
  Restaurant.findById(req.params.id, (err, foundRestaurant) => {
    res.render("restaurants/edit", {restaurant: foundRestaurant});
  });
});

// UPDATE ROUTE

router.put('/:id', isThisYourRestaurant, (req, res) => {
  Restaurant.findByIdAndUpdate(req.params.id, req.body.restaurant, (err, updatedRestaurant) => {
    if(err) {
      res.redirect("/restaurants");
    } else {
      res.redirect(`/restaurants/${req.params.id}`);
    }
  });
});

// DESTROY restaurant ROUTE

router.delete('/:id', isThisYourRestaurant, (req, res) => {
  Restaurant.findByIdAndRemove(req.params.id, (err) => {
    if(err) {
      res.send("The problem is here");
    } else {
      res.redirect("/restaurants");
    }
  });
});

// Middleware to ensure user log in

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

// Middleware to ensure logged in user is allowed to edit/destroy restaurant created

function isThisYourRestaurant(req, res, next) {
  if (req.isAuthenticated()) {
    Restaurant.findById(req.params.id, (err, foundRestaurant) => {
      if(err) {
        res.redirect("/restaurants");
      } else {
        // if logged in, does user own the bar
        if(foundRestaurant.author.id.equals(req.user._id)) {
          next();
          // if not, redirect
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect('back');
  }
}


module.exports = router;
