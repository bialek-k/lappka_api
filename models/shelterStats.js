const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shelterStats = new Schema({
	cardCount: Number,
  toAdoptCount:Number,
  volunteerCount:Number,
  adoptedCount:Number,
});

module.exports = mongoose.model("Shelterstats", shelterStats);
