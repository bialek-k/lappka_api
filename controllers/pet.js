const Pet = require("../models/pet");

exports.pet = async (req, res, next) => {
	try {
		const existingPet = await Pet.findOne({_id:"651aed083d3be40afc765939"}).exec();
    return res.status(200).send(existingPet._id);

	} catch (err){
		console.log(err)
	}
};
