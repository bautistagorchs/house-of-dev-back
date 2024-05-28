/* eslint-disable no-console */
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbURI = process.env.MONGODB_URI;

const connectDB = async () => {
  if (!dbURI) return console.log("No valid connection string");
  try {
    const res = await mongoose.connect(dbURI);
    console.log(
      `Successfully connected to database ${res.connections[0].name} 📦`
    );
  } catch (err) {
    console.error("Failed to connect to database", err);
    process.exit(1);
  }
};

export default connectDB;
