import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createTask, deleteTask, getTask, updateTask } from "../controllers/task.controller.js";

const router = Router();

router.route("/task").post(verifyJWT, createTask);
router.route("/task").get(verifyJWT, getTask);
router.route("/:taskId").delete(verifyJWT, deleteTask);
router.route("/:taskId").put(verifyJWT, updateTask)

export default router;