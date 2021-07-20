const express = require('express')
const app = express();
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiData = require('../module/imageapi')





app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }))


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  // console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/html/travellsblog.html'));
  // res.json({mode:'travells'})
  // console.log("travells");
})
// define the about route
router.get('/image', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/html/travel-content/image.html'));
  // res.send('travells/image')

})


/////////////////////////////////////////////////////////////////////////////////////


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/adminData', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connection sucessfull')
  })
  .catch((err) => {
    console.log(err);
  })




router.get('/image/item', function (req, res) {


  apiData.find(function (err, data) {

    if (err) return console.error(err);

    // console.log(data + 'yes');


    res.status(200).json(data)
  });


})

module.exports = router