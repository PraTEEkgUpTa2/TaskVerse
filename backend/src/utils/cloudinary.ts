import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
};

cloudinary.config(cloudinaryConfig);

const uploadOnCloudinary = async (filePath: string) => {
    try {
        if(!filePath) {
            throw new Error("File path is required");
            return null;
        }
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto",
        });
        console.log("File uploaded to Cloudinary:", result);
        return result;
    } catch (error: any) {
        fs.unlinkSync(filePath); // Clean up the file after upload
        console.error("Error uploading file to Cloudinary:", error);
        throw error;
        return null;
    }
}

export { cloudinary, uploadOnCloudinary };