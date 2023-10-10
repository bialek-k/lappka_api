const cloudinary = require('cloudinary').v2;
const Pet = require('../models/pet');

exports.uploadImages = async (req,res,next) => {

  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };
  
  
  try {
    const images = req.files
    const upload = images.map((img) => {
      return cloudinary.uploader.upload(img.path, options)
    });

    const uploadResult = await Promise.all(upload);
    const imagesData = uploadResult.map((result) => {
      return {
        id:result.asset_id,
        url:result.secure_url
      }
    });
    

    // Add images to petModel in database



    return res.status(200).send(imagesData);

  } catch (error) {
    console.log(error);
  }
}


