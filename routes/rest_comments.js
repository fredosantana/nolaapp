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

// Edit a comment

router.get('/:comment_id/edit', checkRestComment, (req, res) => {
  Comment.findById(req.params.comment_id, (err, foundComment) => {
    if(err) {
      res.redirect("back");
    } else {
      res.render("restaurants/comments/edit", {restaurant_id: req.params.id, comment: foundComment});
    }
  });
});

// Update a comment

router.put('/:comment_id', (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
    if (err) {
      res.redirect("back");
    } else {
      res.redirect(`/restaurants/${req.params.id}`);
    }
  });
});

// Destroy a comment

router.delete('/:comment_id', (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, (err) => {
    console.log(err);
    if (err) {
      res.redirect("back");
    } else {
      res.redirect(`/restaurants/${req.params.id}`)
    }
  });
});


function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

function checkRestComment(req, res, next) {
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


module.exports = router;
