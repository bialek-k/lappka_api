const { uploadImageWithStream } = require('../utils/streamUpload');

exports.uploadImages = async (req, res) => {

  try {
    const uploads = await uploadImageWithStream(req.files);
    return res.status(200).send(uploads)
  } catch (error) {
    console.log(error);
  }

};

