import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectToDB } from "./lib/db.config.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import cors from "cors";
const app = express();
dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true })); // For form data
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.get("/", (req, res) => {
  res.send("Backned Server");
});

app.listen(PORT, () => {
  console.log(`Backend Server Started on ${PORT} PORT`);
  connectToDB();
});
