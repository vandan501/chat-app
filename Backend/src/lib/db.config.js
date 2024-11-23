import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    if (conn) {
      console.log(`Database Connected Successfully on ${conn.connection.host}`);
    }
  } catch (error) {
    console.log("MongoDB connection error", error);
  }
};

