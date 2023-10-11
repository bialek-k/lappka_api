const Pet = require("../models/pet");
const User = require("../models/user");

const { uploadImageWithStream } = require("../utils/streamUpload");

exports.pet = async (req, res, next) => {
	try {
		const existingPet = await Pet.findOne({
			_id: "651aed083d3be40afc765939",
		}).exec();
		return res.status(200).send(existingPet._id);
	} catch (err) {
		return res.status(400).send("Something went wrong");
	}
};

exports.createPet = async (req, res, next) => {
	try {
		const images = req.files;
		const petData = req.body;
		const petImages = await uploadImageWithStream(images);

		const userId = req.user.body.id;
		const existUser = await User.findById(userId).exec();

		if(!petImages){
			return;
		}
		const newPet = {
			name: petData.name,
			description: petData.description,
			species: petData.species,
			animalCategory: petData.animalCategory,
			makring: petData.marking,
			months: petData.months,
			gender: petData.gender,
			weight: petData.weight,
			isSterilized: petData.isSterilized,
			isVisible: petData.isVisible,
			images:petImages,
			shelterId: existUser.shelterId,
		};
		Pet.create(newPet);

		return res.status(200).send("Zwierzak został dodany")
	} catch (err) {
		return res.status(400).send("Something went wrong");
	}
};
