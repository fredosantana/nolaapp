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
  image: String,
  description: String
});

let barSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

let Restaurant = mongoose.model("Restaurant", restaurantSchema);

let Bar = mongoose.model("Bar", barSchema);

Bar.create(
  {
    name: "Bourbon Pub and Parade",
    image: "http://www.neworleansonline.com/images/slideshows/listings/1106/04.jpg",
    description: "The $5 happy hour on Sundays from 6:00PM to 8:00PM is a fabulous way to start your night!!"
  },
  (err, bar) => {
    if(err) {
      console.log(err);
    } else {
      console.log("New bar added");
      console.log(bar);
    }
  }
);


app.get('/', (req, res) => {
  res.render("index");
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

app.get('/restaurants/new', (req, res) => {
  res.render("new_restaurant");
});

app.get('/restaurants/:id', (req, res) => {
  res.render("show");
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
  res.render("new_bar");
});

app.get('/bars/:id', (req, res) => {
  Bar.findById(req.params.id, (err, foundBar) => {
    if(err){
      console.log(err);
    } else {
      res.render("show", {bar: foundBar});
    }
  });
});


app.listen(process.env.PORT || 5000, () => {
  console.log("NolaApp Launched");
});
