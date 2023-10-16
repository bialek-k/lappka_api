const Pet = require("../models/pet");
const User = require("../models/user");
const ShelterStats = require("../models/shelterStats");
const cloudinary = require("cloudinary").v2;

const { uploadImageWithStream } = require("../utils/streamUpload");

exports.getPet = async (req, res, next) => {
	try {
		const petId = req.query.petId;
		const existingPet = await Pet.findOne({
			_id: petId,
		}).exec();

		if (!existingPet) {
			return res.status(404).send("Nie ma takiego zwierzaka");
		}

		await Pet.updateOne({ _id: petId }, { views: existingPet.views + 1 });
		console.log(existingPet);

		return res.status(200).send(existingPet);
	} catch (error) {
		console.log(error);
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

		const currentDate = new Date().toISOString().slice(0, 10);
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
			views: 0,
			adopted: false,
		};
		Pet.create(newPet);

		// Update Shleter Stats
		await ShelterStats.findOneAndUpdate(
			{ shelterId: existUser.shelterId },
			{ $inc: { cardCount: 1, toAdoptCount: 1 } }
		);

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
						views: pet.views,
						adopted: pet.adopted,
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

exports.updatePet = async (req, res) => {
	try {
		const updatePetData = req.body;
		const petId = req.body._id;

		const updatePet = await Pet.findOneAndUpdate({_id: petId}, updatePetData, { new: true }).exec();
		return res.status(200).send(updatePet)
	} catch (error) {
		console.log(error)
	}	
};

exports.deletePet = async (req, res) => {
	try {
		const petId = req.query.petId;

		const petToDelete = await Pet.findById(petId).exec();
		if (!petToDelete) {
			return res.status(404).send("No pet");
		}

		const images = petToDelete.images.map((img) => img.id);
		if (!images) {
			return res.status(404).send("There is no images");
		}
		await cloudinary.api.delete_resources(images);

		// Update Shleter Stats
		await ShelterStats.findOneAndUpdate(
			{ shelterId: petToDelete.shelterId },
			{ $inc: { cardCount: -1, toAdoptCount: -1, adopted: -1 } }
		);

		await Pet.findOneAndDelete({ _id: petId });

		return res
			.status(200)
			.send(`${petToDelete.name} has been removed from database`);
	} catch (error) {
		console.log(error);
	}
};
