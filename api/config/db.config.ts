/* eslint-disable no-console */
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbURI = process.env.MONGODB_URI || "your-default-mongodb-uri-here";

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {});
    console.log("Successfully connected to database");
  } catch (err) {
    console.error("Failed to connect to database", err);
    process.exit(1);
  }
};

export default connectDB;
