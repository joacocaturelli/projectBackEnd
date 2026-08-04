import mongoose from "mongoose";
import { env } from "./env.js";

export const connectMongo = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("MongoDB conectado");
  } catch (error) {
    console.log("Error Mongo:", error);
  }
};
