const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      mongoose   = require('mongoose');

mongoose.connect('mongodb://localhost/nola', {
  useMongoClient: true
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

let restaurantSchema = new mongoose.Schema({
  name: String,
  image: String
});

let barSchema = new mongoose.Schema({
  name: String,
  image: String
});

let Restaurant = mongoose.model("Restaurant", restaurantSchema);
let Bar = mongoose.model("Bar", barSchema);

app.get('/', (req, res) => {
  res.render("landing");
});

app.get('/restaurants', (req, res) => {
  Restaurant.find({}, (err, restaurants) => {
    if(err) {
      console.log(err);
    } else {
      res.render("restaurants", {restaurants:restaurants});
    }
  });
});

app.post('/restaurants', (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let newRestaurant = {name: name, image: image};
  Restaurant.create(newRestaurant, (err, newlyCreated) => {
    if(err) {
      console.log(err);
    } else {
      res.redirect("/restaurants");
    }
  });
});

app.get('/restaurant/new', (req, res) => {
  res.render("new_restaurant");
});

app.get('/restaurants/:id', (req, res) => {
  res.send("Restaurant page coming soon!");
});

app.get('/bars', (req, res) => {
  Bar.find({}, (err, bars) => {
    if(err) {
      console.log(err);
    } else {
      res.render("bars", {bars:bars});
    }
  });
});

app.post('/bars', (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let newBar = {name: name, image: image};
  Bar.create(newBar, (err, newlyCreated) => {
    if(err) {
      console.log(err);
    } else {
      res.redirect("/bars");
    }
  });
});

app.get('/bar/new', (req, res) => {
  res.render("new_bar");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("NolaApp Launched");
});
