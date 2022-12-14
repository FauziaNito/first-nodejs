//DEPENDENCIES
const express = require('express');
const path = require('path');
const mongoose = require('mongoose'); //plugin for mongoDB
const config = require('./config/db');
const passport = require('passport');
//express session
const expressSession = require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,  
});
// Import the user Model
const Registration = require('./models/User');

// Importing Route Files-After separating routes into files
const registrationRoutes = require('./routes/registerRoutes');
const urbanFarmerRouters = require('./routes/urbanFarmerRoutes');
const authenticationRoute = require('./routes/authRoute');
const agriculturalOfficerRoutes = require('./routes/agriculturalOfficerRoutes');
const farmerOneRouters = require('./routes/farmerOneRoutes');

//INSTANTIATIONS
const app = express();

// Setup Database Connections
mongoose.connect(config.database,{ useNewUrlParser: true });
const db = mongoose.connection;

// Check connection
db.once('open', function(){

  console.log('Connected to MongoDB');
});
// Check for db errors
db.on('error', function(err){
  console.error(err);
});


// CONFIGURATIONS
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


//MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(expressSession);//Always above the passport

// Passport Configuration Middleware** for Authentication and handling session
app.use(passport.initialize());
app.use(passport.session());
passport.use(Registration.createStrategy()); // for Authenticating, sessions serializing & Deserializing
passport.serializeUser(Registration.serializeUser()); // Tracking users serial number--It has the user's username & password
passport.deserializeUser(Registration.deserializeUser());

// ******ROUTES*******
app.get('/homepage', (req, res) =>{
  res.render('home-page');
})
app.use("/", registrationRoutes);
app.use('/',urbanFarmerRouters);
app.use("/", authenticationRoute);
app.use('/',agriculturalOfficerRoutes);
app.use('/',farmerOneRouters);

// app.get('/signup',(req, res) =>{
//   res.render('signup');
// });

  // For invalid routes- this should be the second last line in a file
app.get('*', (req, res) => {
  res.send('404! This is an invalid URL.');
});

// Bootstrapping Server
app.listen(3000, () => console.log('We are listening to new file port 3000')); 

