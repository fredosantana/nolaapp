const mongoose = require('mongoose'),
      Bar      = require('./models/bars'),
      Restaurant = require('./models/restaurants'),
      Comment  = require('./models/comments');

let bars = [
  {
    name: "Bourbon Pub and Parade",
    image: "http://www.neworleansonline.com/images/slideshows/listings/1106/04.jpg",
    description: "One of my favorite bars"
  },
  {
    name: "Old Absinthe House",
    image: "http://www.hauntedhouses.com/photos/new-orleans-absinthe-68.jpg",
    description: "I gotta try this place soon"
  },
  {
    name: "Oz",
    image: "https://www.outtraveler.com/sites/outtraveler.com/files/2016/01/28/oz.jpg",
    description: "Another one I go to when I'm in NOLA"
  }
];
let restaurants = [
  {
    name: "Oceana",
    image: "https://1.bp.blogspot.com/-F9vegPn55og/TsktWL0_WLI/AAAAAAAAArY/6n3Q9zbAjaQ/w1200-h630-p-k-no-nu/oceana.jpg",
    description: "First stop for any and all NOLA trips"
  },
  {
    name: "Red Fish Grill",
    image: "http://www.bunkycooks.com/wp-content/uploads/2011/03/Red-Fish-Grill-sign.jpg",
    description: "Fine NOLA dining in a casual setting"
  },
  {
    name: "Port of Call",
    image: "https://media-cdn.tripadvisor.com/media/photo-s/0f/18/7b/62/port-of-call.jpg",
    description: "Excellent burger joint in the heart of the Treme neighborhood"
  }
];

function seedDB() {
  // Remove all bars
  Bar.remove({}, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Removed Bar!");
    }
  });
  // Add a new bar
  bars.forEach((seed) => {
    Bar.create(seed, (err, bars) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Added a bar");
        // Create a comment
        Comment.create(
          {
            text: "Oh the fun we've had here",
            author: "Wayne Allison"
          }, (err, comment) => {
            if (err) {
              console.log(err);
            } else {
              bars.comments.push(comment._id);
              bars.save();
              console.log("Created new comment");
            }
          });
      }
    });
  });

  Restaurant.remove({}, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Removed Restaurant!");
    }
  });

  // Add a few comments
  // Add a new restaurant
  restaurants.forEach((seed) => {
    Restaurant.create(seed, (err, restaurants) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Added a restaurant");
        // Create a comment
        Comment.create(
          {
            text: "The food's delicious!",
            author: "Wil Santana"
          }, (err, comment) => {
            if (err) {
              console.log(err);
            } else {
              restaurants.comments.push(comment._id);
              restaurants.save();
              console.log("Created new comment");
            }
          });
      }
    });
  });
  // Add a few comments

}

module.exports = seedDB;
