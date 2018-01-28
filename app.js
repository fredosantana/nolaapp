const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

let restaurants = [
  {name: "Oceana", image: "https://i.ytimg.com/vi/40SO2PVVdhE/hqdefault.jpg"},
  {name: "Red Fish Grill", image: "http://www.bunkycooks.com/wp-content/uploads/2011/03/Red-Fish-Grill-sign.jpg"},
  {name: "Port of Call", image: "https://www.redbeansandlife.com/wp-content/uploads/2014/06/Port-of-Call-New-Orleans.jpg"}
]

let bars = [
  {name: "Oz", image: "http://www.neworleansonline.com/images/slideshows/listings/1152/04.jpg"},
  {name: "Laffite's Blacksmith Bar", image: "https://www.theclio.com/web/ul/30495.70302.jpg"},
  {name: "Bourbon Pub & Parade", image: "http://www.neworleansonline.com/images/slideshows/listings/1106/04.jpg"}
]

app.get('/', (req, res) => {
  res.render("index");
});

app.get('/restaurants', (req, res) => {
  res.render("restaurants", {restaurants:restaurants});
});

app.post('/restaurants', (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let newRestaurant = {name: name, image: image};
  restaurants.push(newRestaurant);
  res.redirect("/restaurants");
});

app.get('/restaurants/new', (req, res) => {
  res.render("new_restaurant");
});

app.get('/bars', (req, res) => {
  res.render("bars", {bars:bars});
});

app.post('/bars', (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let newBar = {name: name, image: image};
  bars.push(newBar);
  res.redirect("/bars");
});

app.get('/bars/new', (req, res) => {
  res.render("new_bar");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("NolaApp Launched");
});
