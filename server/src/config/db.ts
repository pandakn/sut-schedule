import mongoose from "mongoose";

const DB_NAME = "sut-schedule";

export async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: DB_NAME,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
    throw new Error("Could not connect to MongoDB");
  }
}
