const express = require("express")

const app = express();

const port = process.env.PORT || 80;

const path = require('path');

const bodyParser = require('body-parser');


const mongoose = require('mongoose');

const multer = require('multer');


const bcrypt = require('bcrypt');



app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/module')));

/////////////////////////////////////////setting up view engine to hbs////////////////////
const hbs = require('express-handlebars');


app.engine('hbs', hbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));

app.set('view engine', 'hbs');


////////////////////////////////////////////////routes////////////////////////////////////////////////////////////////////

const travel = require('./routes/travel')
const admin = require('./routes/admin')
const about = require('./routes/about')

app.use('/travells', travel);
app.use('/admin', admin);
app.use('/about', about);







app.get("/", (req, res) => {
  res.render('index',{title:'Home'})

  // res.render('index', { layout: 'other' }); for chenging default layout
})


app.listen(port, () => {
  console.log("server started at port 80");
})