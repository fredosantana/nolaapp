const Bar = require('../models/bars'),
      Comment = require('../models/comments'),
      Restaurant = require('../models/restaurants');

const middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

middlewareObj.isThisYourBar = function(req, res, next){
  if (req.isAuthenticated()) {
    Bar.findById(req.params.id, (err, foundBar) => {
      if(err) {
        res.redirect("/bars");
      } else {
        // if logged in, does user own the bar
        if(foundBar.author.id.equals(req.user._id)) {
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

middlewareObj.checkBarComment = function(req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if(err) {
        res.redirect("/bars");
      } else {
        // if logged in, does user own the comment
        if(foundComment.author.id.equals(req.user._id)) {
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

middlewareObj.isThisYourRestaurant = function(req, res, next) {
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

middlewareObj.checkRestComment = function(req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if(err) {
        res.redirect("/restaurants");
      } else {
        // if logged in, does user own the comment
        if(foundComment.author.id.equals(req.user._id)) {
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

module.exports = middlewareObj
