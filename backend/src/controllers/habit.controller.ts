import { asyncHandler } from "../utils/asyncHandler.js";
import { Request, Response } from "express";
import { ApiError } from "../utils/apiError.js";
import User from "../models/user.models.js";
import { ApiResponse } from "../utils/apiResponse.js";
import Habit from "../models/habit.models.js";

const tagMap: Record<string,number> = {
    // "Health", "Learning", "Mindfulness", "Work", "Personal", "Other"
    Health: 30,
    Learning: 30,
    Mindfulness: 25,
    Work: 25,
    Personal: 20,
    Other: 15
}

const createHabit = asyncHandler(async(req: Request, res: Response) => {
    const {title,tag} = req.body;

    const xp = tagMap[tag] || 15;

    const habit = await Habit.create({
        user: req.user?._id,
        title,
        tag,
        xp,
        completedDates: [],
    });

    if(!habit){
        throw new ApiError(400, "Habit Failed to create");
    }

    res.status(200).json(new ApiResponse(200,habit,"Habit created Successfully"))


});

const getHabit = asyncHandler(async(req: Request, res: Response) => {
    const habit = await Habit.find({user: req.user?._id});
    res.status(200).json(new ApiResponse(200,habit,"Habit fetched successfully"))
})

const deleteHabit = asyncHandler(async(req: Request, res: Response) => {

    const {habitId} = req.params;
    const habit = await Habit.findOneAndDelete({
        _id: habitId,
        user: req.user?._id
    });

    if(!habit){
        throw new ApiError(400, "Habit not found");
    }

    res.status(200).json(new ApiResponse(200,null,"Habit deleted Successfully"))
});

const updateHabit = asyncHandler(async(req: Request, res: Response) => {

    const {habitId} = req.params;
    const {markCompleted} = req.body;

    if(markCompleted){
        
    }
})