import mongoose from "mongoose";

export const connectMongo = async () => {
  try {
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB conectado");
  } catch (error) {
    console.log("Error Mongo:", error);
  }
};
