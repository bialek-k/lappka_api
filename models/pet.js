const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const petSchema = new Schema({
  petId: String,
  added:String,
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
  adopted:Boolean,
  images:[{
    url: String,
    _id: ObjectId,
  }],
  views:Number,
  shelterId: {
    type: Schema.Types.ObjectId,
    ref:'Shelter'
  },
});

petSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Pet', petSchema)
