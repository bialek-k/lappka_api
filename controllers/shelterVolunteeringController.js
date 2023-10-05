const shelterVolunteering = require("../models/shelterVolunteering");

exports.getShelterStats = async (req, res, next) => {
	try {
		const existingShelter = await ShelterStats.findOne({_id:"651aef753d3be40afc76593c"}).exec();
    return res.status(200).send(existingShelter);

	} catch (err){
		console.log(err)
	}

};
