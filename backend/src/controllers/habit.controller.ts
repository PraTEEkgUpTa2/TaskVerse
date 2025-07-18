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

function areDateConsecutive(date1: Date, date2: Date){
    const differ = Math.floor((date2.getTime() - date1.getTime())/(1000*60*60*24))
    return differ === 1;
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

    const habit = await Habit.findOne({
        _id: habitId,
        user: req.user?._id
    })

    if(!habit){
        throw new ApiError(400, "Habit not found");
    }

    if(markCompleted){
        const today = new Date();
        const todaystr = today.toDateString();

        if(habit?.completedDates.some((d) => new Date(d).toDateString() === todaystr)){
            throw new ApiError(400, "Date already exist")
        }

        habit?.completedDates.push(today);

        const sortedDates = habit?.completedDates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
        
        let currentStreak = 1;
        let longestStreak = 1;

        for(let i = 1; i < sortedDates?.length!; i++){
            if(areDateConsecutive(new Date(sortedDates![i-1]), new Date(sortedDates![i]))){
                currentStreak++;
                longestStreak = Math.max(longestStreak, currentStreak);
            }else{
                currentStreak = 1;
            }
        }

        habit.streak = currentStreak;
        habit.longestStreak = longestStreak;

        habit.xp += tagMap[habit.tag] || 15;

        await habit.save();

        return res.status(200).json(new ApiResponse(200,habit,"Habit updated Successfully"));


    }

     const { title, tag } = req.body;
     if (title) habit.title = title;
     if (tag) {
        habit.tag = tag;
        habit.xp = tagMap[tag] || 5;
    }
    
    await habit.save();

    return res.status(200).json(new ApiResponse(200,habit,"Habit Updated Successfully"));

});

export {createHabit,getHabit,deleteHabit,updateHabit};