const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const path = require('path')
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');

const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');
const authController = require('./controllers/auth.js');
const usersController = require('./controllers/users.js');
const triggersController = require('./controllers/triggers.js');
const humansController = require('./controllers/humans.js');

const port = process.env.PORT ? process.env.PORT : '3000';

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(morgan('dev'));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

//PassUserToView should be included before all our routes, including our homepage, just
app.use(passUserToView);



app.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect(`/users/${req.session.user._id}/humans`);
  } else {
    res.render('index.ejs');
  }
});

app.use('/auth', authController);
app.use(isSignedIn);

app.use('/users/humans', humansController);
app.use('/users/:userId/humans', humansController);
//link your controller to a specific route in server.js, incoming requests to /users/applications will be handeled by our triggers controller. 
app.use('/users/triggers', triggersController);
app.use('/users/:userId/triggers', triggersController);

app.use('/users', usersController);


app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
