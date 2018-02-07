const mongoose = require('mongoose'),
      Bar      = require('./models/bars'),
      Restaurant = require('./models/restaurants'),
      Comment  = require('./models/comments');

let bars = [];
let restaurants = [];

function seedDB() {
  // Remove all bars
  // Bar.remove({}, (err) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log("Removed Bar!");
  //   }
  // });
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

  // Restaurant.remove({}, (err) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log("Removed Restaurant!");
  //   }
  // });

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
