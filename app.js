const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send("landing page");
});

app.listen(3000, process.env.IP, () => {
  console.log("NolaApp Launched");
});
