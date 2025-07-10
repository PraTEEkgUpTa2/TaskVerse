
import express from "express";
import dotenv from "dotenv";
// @ts-ignore
import connectDB from "./db/index.js";



dotenv.config({
    path: "./.env",
});

connectDB();

