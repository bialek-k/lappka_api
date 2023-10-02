const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shelterSchema = new Schema({
	cardCount: Number,
	toAdoptCount: Number,
	volunteerCount: Number,
	adoptedCount: Number,
});

module.exports = mongoose.model("Shelter", shelterSchema);
