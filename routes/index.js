const express   = require('express'),
      router    = express.Router()
      passport  = require('passport'),
      User      = require('../models/user');

router.get('/', (req, res) => {
  res.render("index");
});
// ========================
// AUTH Routes
// ========================

// Register form
router.get('/register', (req, res) => {
  res.render('register');
});

// Sign Up Logic
router.post('/register', (req, res) => {
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, (err, user) => {
    if(err){
      console.log(err);
      return res.render('register');
    }
    passport.authenticate('local')(req, res, () => {
      res.redirect('/bars');
    });
  });
});

// Log In form

router.get('/login', (req, res) => {
  res.render('login')
});

// Log In Logic

router.post('/login', passport.authenticate("local",
  {
    successRedirect:"/restaurants",
    failureRedirect:"/login"
  }), (req, res) => {
});

// Log Out Route

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

module.exports = router;
