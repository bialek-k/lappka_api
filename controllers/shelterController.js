const Shelter = require("../models/shelter");

exports.getShelterStats = async (req, res, next) => {
	try {
		const shelterData = await Shelter.findById(
			"6516a522da5ef05ba03f29ba"
		)

		console.log(shelterData);
		res.status(200);
	} catch (err) {
		console.log(err);
	}
};
