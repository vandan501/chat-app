import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: "dsuwjgwgt",
  api_key: "976772499975888",
  api_secret: "9hWGGv30AY32HG51vk5O3exqDhs",
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("File uploaded to Cloudinary:", response.url);

    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    // Remove the local file if the upload failed
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

export default uploadOnCloudinary;
