// import {v2 as cloudinary} from 'cloudinary';
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});

async function uploadProfileImage(localFilePath) {
    try {
        if(!localFilePath) throw new Error("Local File Path is not given");
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type : 'image'
        })
        return response;
    } catch (error) {
        return error;
    }
}
module.exports = uploadProfileImage