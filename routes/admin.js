const express = require('express')
const app = express();
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const bodyParser = require('body-parser');
const multer = require('multer');

const adminData = require('../module/loginadmin')
const apiData = require('../module/imageapi')

const cloudinary = require('../cloudinary/cloudinary')


app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }))





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', new Date())
  next()
})
// define the home page route
router.get('/login', function (req, res) {
  res.render('admin',{title:'Login'})
})

///////////////////////////mongoose log in//////////////////////////////////


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/adminData', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connection sucessfull')
  })
  .catch((err) => {
    console.log(err);
  })

 let dir = path.join(__dirname, '../views')
router.post('/login', function (req, res) {


  //for finding data
  // console.log(req.body);

  adminData.find({ username: req.body.username }
    , function (err, result) {
      if (err) {
        res.send('something wrong')
        return err;
      }
      if (result) {

        // result from database comes in array so grab item using[index]
        // console.log(result.password);

        bcrypt.compare(req.body.password, result[0].password, function (err, matched) {
          if (matched) {
            console.log("matched");
            res.render('upload',{
              display:'d-none',
              title:'Uploads'
            })

          }
        });

        // res.status(200).json(result[1])



      }
    })
  // for saving data
  // bcrypt.hash(req.body.password, saltRounds, function (err, hash) {

  //   let myData = new adminData({
  //     username: req.body.username,
  //     password: hash
  //   })
  //   console.log(myData);
  //   myData.save().then(() => {
  //     res.send(req.body);
  //   }).catch(() => {
  //     res.status(400).send("username")
  //   })
  // });


})

/////////////////////////uploading files to db///////////////////////////////////////////////////

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })

/////////////////////////////  cloudinary file save////////////////////////////////////////



////////////////////////////////////////////////////////////////////

router.post('/upload', upload.single('Image'), async (req, res) => {


  router.use(function timeLog(req, res, next) {
    console.log('Time: ', new Date().toISOString().slice(0, 10))
    next()
  })
  const result = await cloudinary.uploader.upload(req.file.path);

  // console.log(result);

  let myData = new apiData({
    City: req.body.City,
    State: req.body.State,
    Country: req.body.Country,
    Type: req.body.Type,
    Image: req.file.filename,
    Date: req.body.Date,
    Cloudinary_secure_url: result.secure_url
  })
  console.log(myData);
  myData.save().then(() => {
    res.status(200).render('upload',{
      display:'d-block',
      title:'Uploads'

    })
  }).catch(() => {
    res.status(400).send("item was not saved to the databse")
  })
  // console.log(req.file);
  // res.send(req.body);
})




module.exports = router