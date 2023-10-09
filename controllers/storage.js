const uploadHandler = require('../utils/uploadImage');

exports.uploadImages = (req,res,next) => {
  const images = req.body.images;

  try {
    const uploads =  uploadHandler.uploadImages(images);
    return res.status(200).send(uploads)
    
  } catch (error) {
    return res.status(400).send('somehting went wrong')

  }
}