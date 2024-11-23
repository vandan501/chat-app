import express from "express"
import dotenv from "dotenv"
const app=express();
dotenv.config()

app.get("/",(req,res)=>{
    res.send("Backned Server")
})
app.listen(process.env.BACKEND_PORT,()=>{
    console.log(`Backend Server Started on ${process.env.BACKEND_PORT} PORT`)
})