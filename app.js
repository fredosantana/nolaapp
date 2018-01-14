const express = require('express');
const app = express();
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

  res.render("restaurants");
});

app.listen(3000, process.env.IP, () => {
  console.log("NolaApp Launched");
});
