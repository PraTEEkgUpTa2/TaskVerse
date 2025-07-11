import { asyncHandler } from "../utils/asyncHandler.js"
import { Request, Response } from "express";
import { ApiError} from "../utils/apiError.js";
import User  from "../models/user.models.js"; 
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId: string) => {
    try {
        const user = await User.findById(userId) as any;
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Failed to generate tokens");
    }
}


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

    return response;

});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
    // Login logic here
    // get user data from request body
    // validate the data
    // check if user exists
    // check the password
    // send the response with the user data

    const { email, password } = req.body;
    if ([email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "Email and password are required");
    }
    const user = await User.findOne({email});
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Assert user type to include comparePassword method
    const isPasswordValid = await (user as any).comparePassword(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid password");
    }

    const {accessToken, refreshToken}= await generateAccessAndRefreshToken(user._id as string);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const option = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .cookie("refreshToken", refreshToken, option)
    .cookie("accessToken", accessToken, option)
    .json(
        new ApiResponse(
            200,{
                user: loggedInUser,
                accessToken,
                refreshToken
            },
            "User logged in successfully"
        )
    )


    
});

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    // Logout logic here
    // clear the refresh token from the user
    // send the response with success message

    try {
        await User.findByIdAndUpdate(req.user?._id, 
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    return res.status(200)
    .clearCookie("accessToken", { httpOnly: true, secure: true })
    .clearCookie("refreshToken", { httpOnly: true, secure: true })
    .json(new ApiResponse(200, {}, "User logged out successfully"));
    } catch (error) {
        console.error("Error during logout:", error);
        throw new ApiError(500, "Failed to logout user");
    }

}
)

const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Refresh token is required");
    }

    try {
        const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN!) as jwt.JwtPayload;
        const user = await User.findById(decoded?._id);

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        if (user.refreshToken !== incomingRefreshToken) {
            throw new ApiError(401, "Invalid refresh token");
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id as string);

        return res.status(200)
            .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
            .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
            .json(new ApiResponse(200, { accessToken, refreshToken : refreshToken }, "Access token refreshed successfully"));
    } catch (error) {
        console.error("Error refreshing access token:", error);
        throw new ApiError(401, "Invalid refresh token");
    }
})
  

export {registerUser, loginUser, logoutUser, refreshAccessToken};