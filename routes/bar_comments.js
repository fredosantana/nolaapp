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

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

module.exports = router;
