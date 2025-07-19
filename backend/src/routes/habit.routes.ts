import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createHabit,getHabit,deleteHabit,updateHabit } from "../controllers/habit.controller.js";

const router = Router();

router.route("/habit").post(verifyJWT,createHabit);
router.route("/habit").get(verifyJWT, getHabit);
router.route("/:habitId").delete(verifyJWT,deleteHabit);
router.route("/:habitId").patch(verifyJWT,updateHabit);

export default router;