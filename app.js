const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const gameRoutes = require('./routes/game-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const app = express();
var PORT = process.env.PORT || 3000;


app.use(express.static(__dirname + '/public'));

// set view engine
app.set('view engine', 'ejs');

//middleware functions
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());


// connect to mongodb
// mongoose.connect(process.env.MONGODB_URI || keys.mongodb.dbURI, () => {
//     console.log('connected to mongodb');
// });

//mongodb://<dbuser>:<dbpassword>@ds157268.mlab.com:57268/whackabug

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://albertcoder:2AgcPFgh8vyizm9@ds157268.mlab.com:57268/whackabug";
mongoose.connect(MONGODB_URI);

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/game', gameRoutes);



// create home route
app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});

app.listen(PORT, () => {
    console.log('app now listening for requests on port ' + PORT + '.');
});
