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

		if (!petImages) {
			return;
		}

		const currentDate = new Date().toISOString().slice(0,10)
		const newPet = {
			added: currentDate,
			name: petData.name,
			description: petData.description,
			species: petData.species,
			animalCategory: petData.animalCategory,
			marking: petData.marking,
			months: petData.months,
			gender: petData.gender,
			weight: petData.weight,
			isSterilized: petData.isSterilized,
			isVisible: petData.isVisible,
			images: petImages,
			shelterId: existUser.shelterId,
		};
		Pet.create(newPet);

		return res.status(200).send("Zwierzak został dodany");
	} catch (err) {
		return res.status(400).send("Something went wrong");
	}
};

exports.paginatedPetList = async (req, res, next) => {
	const pageNumber = req.query.page || 1;
	const pageSize = req.query.pageSize || 10;

	if (pageSize < 0) {
		return res.status(500).send("PageSize cannot have a negative value");
	}

	if (pageNumber < 0) {
		return res.status(500).send("PageNumber cannot have a negative value");
	}

	try {
		await Pet.paginate(
			{},
			{ page: pageNumber, limit: pageSize },
			(err, result) => {
				if (err) {
					return res
						.status(500)
						.send("Error occurred while fetching pet list.");
				}
				const { docs, total, limit, page, pages } = result;

				const petData = docs.map((pet) => {
					return {
						added: pet.added,
						petId: pet._id,
						name: pet.name,
						description: pet.description,
						species: pet.species,
						animalCategory: pet.animalCategory,
						marking: pet.marking,
						months: pet.months,
						gender: pet.gender,
						weight: pet.weight,
						isSterilized: pet.isSterilized,
						isVisible: pet.isVisible,
						images: pet.images.map((img) => {
							return { id: img.id, url: img.url };
						}),
					};
				});

				const petListData = {
					petList: petData,
					total,
					limit,
					page,
					pages,
				};

				return res.status(200).send(petListData);
			}
		);
	} catch (error) {
		console.log(error);
	}
};
