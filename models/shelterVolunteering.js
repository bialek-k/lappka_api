const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shelterVolunteeringSchema = new Schema({
	bankAccountNumber: String,
	donationDescription: String,
	dailyHelpDescription: String,
	takingDogsOutDescription: String,
	isDonationActive: Boolean,
	isDailyHelpActive: Boolean,
	isTakingDogsOutActive: Boolean,
});

module.exports = mongoose.model("Volunteering", shelterVolunteeringSchema);
