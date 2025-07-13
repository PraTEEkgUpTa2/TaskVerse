import express from "express";
import dotenv from "dotenv";

import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config({
    path: "./.env",
});

app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser());

//Routes

import userRoutes from "./routes/user.routes.js";

//Routes declaration

app.use("/api/v1/users", userRoutes);

export { app }