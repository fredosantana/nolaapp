const express    = require('express'),
      router     = express.Router(),
      Restaurant = require('../models/restaurants'),
      Comment    = require('../models/comments');

router.get('/restaurants/:id/comments/new', isLoggedIn, (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if(err) {
      console.log(err);
    } else {
      res.render("restaurants/comments/new", {restaurant: restaurant});
    }
  });
});

router.post('/restaurants/:id/comments', isLoggedIn, (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if(err) {
      console.log(err);
      redirect("/restaurants");
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if(err) {
          console.log(err);
        } else {
          restaurant.comments.push(comment._id);
          restaurant.save();
          res.redirect('/restaurants/' + restaurant._id);
        }
      });
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
