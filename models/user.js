const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName:String,
  lastName:String,
  emailaddress:String,
  password:String,
  shelterId:ObjectId,
});

module.exports = mongoose.model('User', userSchema)
