const Pet = require('../models/pet');
const { uploadImageWithStream } = require('../utils/streamUpload');

exports.uploadImages = async (req, res) => {

  try {

    const petId = req.body.petId
    const images = req.files;


    const uploads = await uploadImageWithStream(images);

    const petToUpdate = await Pet.findById(petId).exec();

    const newImagesArray = [...petToUpdate.images, ...uploads]
    
    console.log(newImagesArray);
    // console.log(petToUpdate); 
    // console.log(uploads)


    // return res.status(200).send(uploads)
  } catch (error) {
    console.log(error);
  }

};

