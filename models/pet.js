const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
species - rasa
animalCategory - gatunek
marking - umaszczenie

*/

const petSchema = new Schema({
  petId: String,
  name: String,
  description: String,
  species: String,
  animalCategory: String,
  marking: String,
  months:Number,
  gender: String,
  weight: Number,
  isSterilized:Boolean,
  isVisible:Boolean,
  images:[{
    id: String,
    url: String,
  }],
  shelterId: {
    type: Schema.Types.ObjectId,
    ref:'Shelter'
  },
});

module.exports = mongoose.model('Pet', petSchema)
