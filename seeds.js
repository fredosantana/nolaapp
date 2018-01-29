const mongoose = require('mongoose'),
      Bar      = require('./models/bars');
      // Comment  = require('./models/comment');

var bars = [
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
        // Comment.create(
        //   {
        //     text: "Oh the fun we've had here",
        //     author: "Wil Santana"
        //   }, (err, comment) => {
        //     if (err) {
        //       console.log(err);
        //     } else {
        //       bar.comments.push(comment);
        //       bar.save();
        //       console.log("Created new comment");
        //     }
        //   });
      }
    });
  });
  // Add a few comments
}

module.exports = seedDB;
