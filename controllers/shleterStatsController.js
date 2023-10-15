const User = require("../models/user");
const ShelterStats = require("../models/shelterStats");

exports.getShelterStats = async (req, res, next) => {
	
	try {
		const userId = req.user.body.id;
		const existUser = await User.findById(userId).exec();

		if(!existUser){
			return res.status(500).send("Request not authorized");
		}

		const statsData = await ShelterStats.findOne({shelterId : existUser.shelterId}).exec();
		return res.status(200).send(statsData)

	} catch (err){
		return res.status(500).send("Internal Server Error")
	}

};
