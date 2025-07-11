import { asyncHandler } from "../utils/asyncHandler.js"
import { Request, Response } from "express";
import { ApiError} from "../utils/apiError.js";
import User  from "../models/user.models.js"; 
import { uploadOnCloudinary } from "src/utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";


interface RegisterUserRequest {
    files?: {
        avatar: { path: string }[];
        [fieldname: string]: { path: string }[];
    };
    body: {
        name?: string;
        email?: string;
        password?: string;
        [key: string]: any;
    };}

    interface RegisterUserResponse {
    message: string;
}
const registerUser = asyncHandler(async (req: Request, res: Response<RegisterUserResponse>) => {
    const customReq = req as Request & RegisterUserRequest;


    // Registration logic here
    // get user data from request body
    // validate the data
    // check if user already exists
    // check the image if provided
    const { name, email, password } = customReq.body;
    if ([name, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "Name, email, and password are required");
    }
    // check if the user is created successfully
    // send the response with the user data

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(409, "User already exists with this email");
    }
    // Example usage of avatar file path if provided
    const avatarPath = customReq.files?.avatar?.[0]?.path;
    const coverImagePath = customReq.files?.coverImage?.[0]?.path;

    const avatar = await uploadOnCloudinary(avatarPath!)
    const coverImage = await uploadOnCloudinary(coverImagePath!)

    if(!avatar || !coverImage) {
        throw new ApiError(500, "Failed to upload images");
    }

    const user = await User.create({
        name: name.toLowerCase(),
        email,
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
    })
   

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Failed to create user");
    }

    const response = res.status(201).json(new ApiResponse(200, createdUser, "User created successfully"));




   
});
  

export {registerUser}