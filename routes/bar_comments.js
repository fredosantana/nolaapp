const express = require('express'),
      router  = express.Router({mergeParams: true}),
      Bar     = require('../models/bars'),
      Comment = require('../models/comments');

router.get('/new', isLoggedIn, (req, res) => {
  Bar.findById(req.params.id, (err, bar) => {
    if(err) {
      console.log(err);
    } else {
      res.render("bars/comments/new", {bar: bar});
    }
  });
});

router.post('/', isLoggedIn, (req, res) => {
  Bar.findById(req.params.id, (err, bar) => {
    if(err) {
      console.log(err);
      redirect("/bars");
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if(err) {
          console.log(err);
        } else {
          // add username and ID to comments
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          // console.log(`New comment by: ${req.user.username}`)
          // save comment
          comment.save();
          console.log(comment);
          bar.comments.push(comment._id);
          bar.save();
          res.redirect('/bars/' + bar._id);
        }
      });
    }
  });
});

// Edit a comment

router.get('/:comment_id/edit', checkBarComment, (req, res) => {
  Comment.findById(req.params.comment_id, (err, foundComment) => {
    if(err) {
      res.redirect("back");
    } else {
      res.render("bars/comments/edit", {bar_id: req.params.id, comment: foundComment});
    }
  });
});

// Update a comment

router.put('/:comment_id', checkBarComment, (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
    if (err) {
      res.redirect("back");
    } else {
      res.redirect(`/bars/${req.params.id}`);
    }
  });
});

// Destroy a comment

router.delete('/:comment_id', checkBarComment, (req, res) => {
  // res.send("Bar delete route");
  Comment.findByIdAndRemove(req.params.comment_id, (err) => {
    console.log(err);
    if (err) {
      res.redirect("back");
    } else {
      res.redirect(`/bars/${req.params.id}`)
    }
  });
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

function checkBarComment(req, res, next) {
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


module.exports = router;
