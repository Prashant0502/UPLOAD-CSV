const mongoose = require('mongoose');

const csvSchema = new mongoose.Schema({
  FirstName: {
    type: String
  },
  LastName: {
    type: String
  },
  age: {
    type: Number
  },
  MobileNo : {
    type: Number
  },
  City: {
    type: String
  }
});

module.exports = mongoose.model('personaldata', csvSchema);