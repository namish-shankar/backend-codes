// import { v2 as cloudinary } from 'cloudinary';
// import fs from "fs";
// //file system=default se hi downloaded with node js



// // Configuration
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
// });

// const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath)
//             return null
//         //upload on cloudinary
//         const response = await cloudinary.uploader.upload(localFilePath, {
//             resource_type: "auto"//img , vid anything automatically detected
//         })
//         console.log("file is uploaded on cloudinary ", response.url);
//         fs.unlinkSync(localFilePath);
//         return response;
//     }
//     catch (error) {
//         fs.unlinkSync(localFilePath)//remove locally saved temporary file as upload operation failed
//         return null;

//     }
// };
// export { uploadOnCloudinary };
import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}



export {uploadOnCloudinary}