
const mongoose = require('mongoose');

const apiSchema = new mongoose.Schema({
  City: String,

  State: String,

  Country: String,

  Image: String,

  Type: String,

  Date: String,

  Cloudinary_secure_url: String



});

const apiData = mongoose.model('apiData', apiSchema);

module.exports = apiData;