
const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
  username: String,

  password: String,

});

const adminData = mongoose.model('adminData', adminSchema);

module.exports = adminData;