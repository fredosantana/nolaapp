const express       = require('express'),
      app           = express(),
      bodyParser    = require('body-parser'),
      mongoose      = require('mongoose'),
      passport      = require('passport'),
      LocalStrategy = require('passport-local'),
      Bar           = require('./models/bars'),
      Restaurant    = require('./models/restaurants'),
      Comment       = require('./models/comments'),
      User          = require('./models/user'),
      seedDB        = require('./seeds');

const barsRoutes    = require('./routes/bars'),
      barsComments  = require('./routes/bar_comments'),
      restRoutes    = require('./routes/restaurants'),
      restComments  = require('./routes/rest_comments'),
      indexRoutes   = require('./routes/index');

mongoose.connect('mongodb://localhost/nola', {});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
seedDB();

// PASSPORT CONFIGURATION

app.use(require('express-session')({
  secret: "Gizmo is annoying but so damn cute!",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use('/', indexRoutes);
app.use('/bars', barsRoutes);
app.use('/bars/:id/comments', barsComments);
app.use('/restaurants', restRoutes);
app.use('/restaurants/:id/comments', restComments);

app.listen(process.env.PORT || 5000, () => {
  console.log("NolaApp Launched");
});
