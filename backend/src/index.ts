
import express from "express";
import dotenv from "dotenv";
// @ts-ignore
import connectDB from "./db/index.js";
import { app } from "./app.js";



dotenv.config({
    path: "./.env",
});

connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})   
.catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process with failure
});

