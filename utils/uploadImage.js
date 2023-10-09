const cloudinary = require('cloudinary').v2;

const options = {
  use_filename: true,
  unique_filename: false,
  overwrite: true,
};

const uploadImage = async (image) => {
  try {
    const upload = await cloudinary.uploader.upload(image, options);
    return upload;
  } catch (error) {
    return `${error.message}` 
  }
}

module.exports.uploadImages = (images) => {
  const uploads = images.map((img) =>  uploadImage(img));
  const result = Promise.all(uploads);
  console.log(result);
}
