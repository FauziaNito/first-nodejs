// Dependencies
const express = require('express');// importing express-always the first line
const path = require('path');

//Instantiations-----------Section in Anatomy of an Express Server
const app = express();

// Configurations

// Setting a view engine to pug
app.set('view engine', 'pug');
// setting views as the directory(folder) where the view engine will find all other html/pug pages
app.set('views', path.join(__dirname, 'views'));
app.set('views',  './views');



// *******Middleware*******

app.use(express.urlencoded({ extended: false })); //bodyparser
// app.use(express.urlencoded({ extended: true })); 

//caters for static files. css, vanilla js etc
app.use(express.static(path.join(__dirname, 'public')));
// specifically for dynamic images uploaded from the website by the user-- its good practice to have a different folder for them
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));


// *******END Middleware*******


// ******Routes*******

  // For invalid routes- this should be the second last line in a file
app.get('*', (req, res) => {
  res.send('404! This is an invalid URL.');
});
// ******End Routes*******

// Bootstrapping Server
//Marks the end of the file execution in the server file
app.listen(3000, () => console.log('We are listening to port 3000')); 

