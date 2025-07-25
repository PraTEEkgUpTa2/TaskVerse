import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env",
});

const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
};

cloudinary.config(cloudinaryConfig);

const uploadOnCloudinary = async (filePath: string | undefined) => {
    try {
        if(!filePath) {
            throw new Error("File path is required");
            return null;
        }
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto",
        });
        console.log("File uploaded to Cloudinary:", result);
        fs.unlinkSync(filePath); // Clean up the file after upload
        return result;
    } catch (error: any) {
        if (filePath) fs.unlinkSync(filePath); // Clean up the file after upload
        console.error("Error uploading file to Cloudinary:", error);
        throw error;
    }
}

export { cloudinary, uploadOnCloudinary };