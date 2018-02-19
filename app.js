const express       = require('express'),
      app           = express(),
      bodyParser    = require('body-parser'),
      mongoose      = require('mongoose'),
      passport      = require('passport'),
      LocalStrategy = require('passport-local'),
      Bar           = require('./models/bars'),
      Restaurant    = require('./models/restaurants'),
      Comment       = require('./models/comments'),
      User          = require('./models/user'),
      seedDB        = require('./seeds');

mongoose.connect('mongodb://localhost/nola', {});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
seedDB();

// PASSPORT CONFIGURATION

app.use(require('express-session')({
  secret: "Gizmo is annoying but so damn cute!",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res) => {
  res.render("index");
});

// =======================
// Bars
// =======================

app.get('/bars', (req, res) => {
  Bar.find({}, (err, bars) => {
    if(err) {
      console.log(err);
    } else {
      res.render("bars/bars", {bars:bars});
    }
  });
});

app.post('/bars', (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let description = req.body.description;
  let newBar = {name: name, image: image, description: description};
  Bar.create(newBar, (err, newlyCreated) => {
    if(err) {
      console.log(err);
    } else {
      res.redirect("/bars");
    }
  });
});

app.get('/bars/new', (req, res) => {
  res.render("bars/new_bar");
});

app.get('/bars/:id', (req, res) => {
  Bar.findById(req.params.id).populate("comments").exec((err, foundBar) => {
    if(err){
      console.log(err);
    } else {
      console.log(foundBar);
      res.render("bars/show", {bar: foundBar});
    }
  });
});

// Bar Comments Routes

app.get('/bars/:id/comments/new', (req, res) => {
  Bar.findById(req.params.id, (err, bar) => {
    if(err) {
      console.log(err);
    } else {
      res.render("bars/comments/new", {bar: bar});
    }
  });
});

app.post('/bars/:id/comments', (req, res) => {
  Bar.findById(req.params.id, (err, bar) => {
    if(err) {
      console.log(err);
      redirect("/bars");
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if(err) {
          console.log(err);
        } else {
          bar.comments.push(comment._id);
          bar.save();
          res.redirect('/bars/' + bar._id);
        }
      });
    }
  });
});

// =======================
// Restaurants
// =======================


app.get('/restaurants', (req, res) => {
  Restaurant.find({}, (err, restaurants) => {
    if(err) {
      console.log(err);
    } else {
      res.render("restaurants/restaurants", {restaurants:restaurants});
    }
  });
});

app.post('/restaurants', (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let description = req.body.description;
  let newRestaurant = {name: name, image: image, description: description};
  Restaurant.create(newRestaurant, (err, newlyCreated) => {
    if(err) {
      console.log(err);
    } else {
      res.redirect("/restaurants");
    }
  });
});

app.get('/restaurants/new', (req, res) => {
  res.render("restaurants/new_restaurant");
});

app.get('/restaurants/:id', (req, res) => {
  Restaurant.findById(req.params.id).populate("comments").exec((err, foundRestaurant) => {
    if(err){
      console.log(err);
    } else {
      console.log(foundRestaurant);
      res.render("restaurants/show", {restaurant: foundRestaurant});
    }
  });
});

// Restaurant Comments Routes

app.get('/restaurants/:id/comments/new', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if(err) {
      console.log(err);
    } else {
      res.render("restaurants/comments/new", {restaurant: restaurant});
    }
  });
});

app.post('/restaurants/:id/comments', (req, res) => {
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

// ========================
// AUTH Routes
// ========================

// Register form
app.get('/register', (req, res) => {
  res.render('register');
});

// Sign Up Logic
app.post('/register', (req, res) => {
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

app.listen(process.env.PORT || 5000, () => {
  console.log("NolaApp Launched");
});
