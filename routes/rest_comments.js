const express    = require('express'),
      router     = express.Router({mergeParams: true}),
      Restaurant = require('../models/restaurants'),
      Comment    = require('../models/comments');

router.get('/new', isLoggedIn, (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if(err) {
      console.log(err);
    } else {
      res.render("restaurants/comments/new", {restaurant: restaurant});
    }
  });
});

router.post('/', isLoggedIn, (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if(err) {
      console.log(err);
      redirect("/restaurants");
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if(err) {
          console.log(err);
        } else {
          // add username and ID to comments
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          // save comment
          comment.save();
          console.log(comment);
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
  res.redirect('/');
};

module.exports = router;
