import mongoose from "mongoose";

const connectionUri = process.env.MONGODB_URI;

if (!connectionUri) {
  throw new Error('MongoDB URI is missing in .env.local');
}

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(connectionUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
    process.exit(1)
  }
};