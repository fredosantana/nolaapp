const express = require('express');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render("landing");
});

app.get('/restaurants', (req, res) => {
  let restaurants = [
    {name: "Oceana", image: "https://i.ytimg.com/vi/40SO2PVVdhE/hqdefault.jpg"},
    {name: "Red Fish Grill", image: "http://www.bunkycooks.com/wp-content/uploads/2011/03/Red-Fish-Grill-sign.jpg"},
    {name: "Port of Call", image: "https://www.redbeansandlife.com/wp-content/uploads/2014/06/Port-of-Call-New-Orleans.jpg"}
  ]

  res.render("restaurants", {restaurants:restaurants});
});

app.get('/bars', (req, res) => {
  let bars = [
    {name: "Oz", image: "http://www.neworleansonline.com/images/slideshows/listings/1152/04.jpg"},
    {name: "Laffite's Blacksmith Bar", image: "https://www.theclio.com/web/ul/30495.70302.jpg"},
    {name: "Bourbon Pub & Parade", image: "http://www.neworleansonline.com/images/slideshows/listings/1106/04.jpg"}
  ]

  res.render("bars", {bars:bars});
});


app.listen(3000, process.env.IP, () => {
  console.log("NolaApp Launched");
});
