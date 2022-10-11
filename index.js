// Dependencies
const express = require('express');// importing express
const path = require('path');
//Instantiations
const app = express();

// Configurations
// Setting a view engine to pug
app.set('view engine', 'pug');
// setting views as the directory(folder) where the view engine will find all other html/pug pages
app.set('views', path.join(__dirname, 'views'));
app.set('views',  './views');



// *******Middleware*******

//Simple request time logger for a specific route
// app.use('/about', (req, res, next) => {
//   console.log('A new request received at ' + Date.now());
//   next();
// });
// To parse URL encoded data. Bodyparser
app.use(express.urlencoded({ extended: false })); //bodyparser
// app.use(express.urlencoded({ extended: true })); 

//caters for static files. css, vanilla js etc
app.use(express.static(path.join(__dirname, 'public')));
// specifically for dynamic images uploaded from the website by the user-- its good practice to have a different folder for them
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));


// *******END Middleware*******


// ******Routes*******
// This is a gate route- that calls the index page
app.get('/homepage', (req, res) => { // new
    res.send('Homepage! Hello world.');
  });

// This is a route- that calls the about page
app.get('/about', (req, res) => { // new
    res.send('About page. Nice.');
  });

  //A Route with Routing ***Parameters***-- Named URL segments(specifically Id )
app.get('/books/:bookId', (req, res) => {
  res.send(req.params);
});
// Path parameter
app.get('/users/:name', (req, res)=> {
  res.send('Hello ' + req.params.name)
})
// Query Params
app.get("/users", (req, res) => {
  res.send(
    "My query params are: " + req.query.class + " and " + req.query.cohort
  );
});

//put request route for updating
app.put("/about", (req, res) => {
  res.send("You have changed me");
});

//post request route for creating new
app.post("/signup", (req, res) => {
  res.send("You have registered a user");
});


app.delete("/about", (req, res) => {
  res.send("You have deleted something");
});

// How to send files
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/html/home-page.html");
});

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/html/signup.html");
});

//req.body picks & decodes the info from the form:Remember to set up a body parser middle ware up before routes
app.post("/signup", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

// Rendering pug files
// When using a template engine(pug), the get() routes will render pages ie [res.render] instead of send ie [res.send]
app.get("/register", (req, res) => {
  res.render('registration')
});

//req.body picks & decodes the info from the form:Remember to set up a body parser middle ware up before routes
app.post("/register", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

// Rendering my home page
app.get("/Welcome", (req, res) => {
  res.render('home-page')
});

app.get("/Ufarmsignup", (req, res) => {
  res.render('signup')
});




  // For invalid routes- this should be the second last line in a file
app.get('*', (req, res) => {
  res.send('404! This is an invalid URL.');
});
// ******End Routes*******

// Bootstrapping Server
//Marks the end of the file execution in the server file
app.listen(3000, () => console.log('We are listening to port 3000')); 

