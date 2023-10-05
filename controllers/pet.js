const Pet = require("../models/pet");
const Shelter = require ('../models/shelter');


exports.pet = async (req, res, next) => {
	try {
		const existingPet = await Pet.findOne({_id:"651aed083d3be40afc765939"}).exec();
    return res.status(200).send(existingPet._id);

	} catch (err){
		console.log(err)
	}
};

exports.createPet = async (req,res,next) => {
	
	try {

		const userToken = req.userToken;
		console.log(userToken);

 		Pet.create({
		name:req.body.name,
		species:req.body.species,
		// shelterId: req.Shelter._id
	})

	return res.status(200).send("Added pet")
	} catch(err) {
		console.log(err);
	}
}
