import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
    cookies: Record<string, any>;
    user?: any;
}

export const verifyJWT = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token: string | undefined = req.cookies?.accessToken || (req.headers["authorization"] as string)?.replace("Bearer ", "");

    if(!token){
        throw new ApiError(401, "Access token is required");
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
        const payload = typeof decoded === "string" ? {} : decoded as jwt.JwtPayload;
        const user = await User.findById(payload._id).select("-password -refreshToken");
        console.log("Decoded user:", user);

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        req.user = user;
        next();

       
    } 
    catch (error) {
        throw new ApiError(401, "Invalid access token");
        
    }
})