const Pet = require('../models/pet');
const { uploadImageWithStream } = require('../utils/streamUpload');

exports.uploadImages = async (req, res) => {

  try {
    const petId = req.body.petId
    const images = req.files;

    const uploads = await uploadImageWithStream(images);
    const updatedPet = await Pet.updateOne({_id:petId}, {$push: {images: uploads}}).exec();

    return res.status(200).send(updatedPet);
  } catch (error) {
    console.log(error);
  }

};

