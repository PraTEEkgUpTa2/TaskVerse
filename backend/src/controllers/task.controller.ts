import { asyncHandler } from "../utils/asyncHandler.js";
import { Request, Response } from "express";
import { ApiError } from "../utils/apiError.js";
import User from "../models/user.models.js";
import { ApiResponse } from "../utils/apiResponse.js";
import Task from "../models/task.models.js"

const createTask = asyncHandler(async(req: Request,res: Response) => {

    const {title, priority,status, tags, dueDate} = req.body;

     if (!title?.trim()) {
        throw new ApiError(400, "Title is required");
     }

     const task = await Task.create({
        title,
        priority,
        status,
        tags,
        dueDate,
        user: req.user?._id
     })

     res.status(201).json(new ApiResponse(201, task, "Task created Successfully"));

});

const getTask = asyncHandler(async(req: Request, res: Response) => {
    const tasks = await Task.find({user: req.user?._id});
    
    res.status(201).json(new ApiResponse(201,tasks,""))
})

const deleteTask = asyncHandler(async(req: Request, res: Response) => {

    const {taskId} = req.params

    if (!taskId) throw new ApiError(400, "No Task ID provided");

    const task = await Task.findOneAndDelete({
        _id: taskId,
        user: req.user?._id
    })

    if(!task){
        throw new ApiError(400,"Task not found");
    }
    

    res.status(200).json(new ApiResponse(200,null,"Task deleted Successfully"));
})

const updateTask = asyncHandler(async (req: Request, res: Response) => {

    const {taskId} = req.params;
    const {title, priority, status, tags, dueDate} = req.body;

    const task = await Task.findOne({
        _id: taskId,
        user: req.user?._id
    })

      if (!task) {
    throw new ApiError(404, "Task not found or unauthorized");
}

    task.title = title ?? task.title;
    task.priority = priority ?? task.priority;
    task.status = status ?? task.status;
    task.tags = tags ?? task.tags;
    task.dueDate = dueDate ?? task.dueDate;

    await task.save();

    res.status(201).json(new ApiResponse(201,task,"Task Updated Successfully"));

})

export {createTask,getTask,deleteTask,updateTask}


