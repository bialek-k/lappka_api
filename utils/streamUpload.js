const cloudinary = require('cloudinary').v2;
const streamifier = require("streamifier");

const uploadImageWithStream = async (files) => {

  try {
    const streamUpload = (files) => {
      return Promise.all(
        files.map((file) => {
          return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream((error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            });
            streamifier.createReadStream(file.buffer).pipe(stream);
          });
        })
      );
    };
    
    const resultStream = await streamUpload(files);
    const resultData = resultStream.map((item) => {
      return {
        id: item.public_id,
        url: item.secure_url,
      };
    });

    
    return resultData;
  } catch (error) {
    console.log(error);
  }
  
}

exports.uploadImageWithStream = uploadImageWithStream;

