import dotenv from "dotenv";
// reauire index.js for loading of file.
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})

connectDB();



// First appraoch for connnecting data.

/* 

import mongoose from "mongoose";
import { DB_NAME } from "./constants";

import express from "express";
const app = express()

// Making effi for better connnection for database.
( async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("Error on express connect: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
            
        })
    }catch(error){
        console.log("Error: ", error);
        throw error
    }
})() */