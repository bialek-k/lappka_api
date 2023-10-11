const Pet = require("../models/pet");
const User = require ('../models/user');


exports.pet = async (req, res, next) => {
	try {
		const existingPet = await Pet.findOne({_id:"651aed083d3be40afc765939"}).exec();
    return res.status(200).send(existingPet._id);

	} catch (err){
		return res.status(400).send("Something went wrong")
	}
};

exports.createPet = async (req,res,next) => {

	try {
const images = req.files;
const petData = req.body;
	console.log(images, petData);
	return res.status(200).send('coś mam')
	// const {name, species} = req.body;

	// const userId = req.user.body.id
	// const existUser = await User.findById(userId).exec();

	// const newPet = {
	// 	name:name,
	// 	species:species,
	// 	shelterId: existUser.shelterId
	// }
	// // Pet.create(newPet);

	// return res.status(200).send("Added pet")
	
} catch(err) {
	return res.status(400).send("Something went wrong")
	}
}
