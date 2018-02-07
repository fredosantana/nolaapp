const express     = require('express'),
      app         = express(),
      bodyParser  = require('body-parser'),
      mongoose    = require('mongoose'),
      Bar         = require('./models/bars'),
      Restaurant  = require('./models/restaurants'),
      seedDB      = require('./seeds');

seedDB();
mongoose.connect('mongodb://localhost/nola', {
  useMongoClient: true
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

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
      res.render("show", {bar: foundBar});
    }
  });
});

// Bar Comments Routes

app.get('/bars/:id/comments/new', (req, res) =>{
  res.render("bars/comments/new");
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
      res.render("show", {bar: foundRestaurant});
    }
  });
});

// Restaurant Comments Routes

app.get('/restaurants/:id/comments/new', (req, res) =>{
  res.render("restaurants/comments/new");
});


app.listen(process.env.PORT || 5000, () => {
  console.log("NolaApp Launched");
});
