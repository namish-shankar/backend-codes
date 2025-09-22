// requinre('dotenv').config({path:'./env'})
import dotenv from "dotenv"
dotenv.config(
    {
        path:"./.env"
    }
);
// import mongoose from "mongoose";
//  import { DB_NAME } from "./constants.js";  
import connectDB from "./db/index.js";



//APPROACH 1:
 import express from "express";

const app=express()
// (async () => {
//     try {
//         await mongoose.connect('${process.env.MONGODB_URI}/${DB_NAME}', {);
//         //console.log("Connected to MongoDB");
//         app.on( "error encountered:",(error)=>{
//             console.log("ERROR:",error);
//             throw error
//         })
//         app.listen(process.env.PORT,()=>{
//             console.log('app is listening on port ${process.env.PORT}:');
//         })
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error); 
//         throw error;
//     }
// })();


//APPROACH 2:
connectDB()
.then(()=>
{
    app.on( "error encountered:",(error)=>{
            console.log("ERROR:",error);
            throw error
        })
    app.listen((process.env.PORT || 8000),()=>{
         console.log(`Server is running at port: ${process.env.PORT || 8000}`);
    })
})
.catch((err)=>{
    console.log("connection failed ! ",err);
})
