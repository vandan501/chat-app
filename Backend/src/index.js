import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectToDB }  from "./lib/db.config.js";
import cookieParser from "cookie-parser";

const app=express();
dotenv.config()
const PORT = process.env.PORT;
app.use(express.json())
app.use(cookieParser());
app.use("/api/auth",authRoutes)
app.get("/",(req,res)=>{
    res.send("Backned Server")
})


 
app.listen(PORT,()=>{
    console.log(`Backend Server Started on ${PORT} PORT`);
    connectToDB();
})