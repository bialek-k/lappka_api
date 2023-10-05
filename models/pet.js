const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = new Schema({
  petId: String,
  name: String,
  species: String,
  shelterId: {
    type: Schema.Types.ObjectId,
    ref:'Shelter'
  }
});

module.exports = mongoose.model('Pet', petSchema)
