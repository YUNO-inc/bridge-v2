// db.ts
import mongoose from "mongoose";

let MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

MONGODB_URI = MONGODB_URI.replace("<ENVIRONMENT>", process.env.NODE_ENV);
interface GlobalWithMongoose {
  mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// Add mongoose to NodeJS global type
declare const global: GlobalWithMongoose;

// Initialize global mongoose connection state
const globalMongoose = global as unknown as GlobalWithMongoose;
globalMongoose.mongoose = {
  conn: null,
  promise: null,
};

export async function connect() {
  try {
    if (globalMongoose.mongoose.conn) {
      console.log("Using existing MongoDB connection");
      return globalMongoose.mongoose.conn;
    }

    if (!globalMongoose.mongoose.promise) {
      const opts = {
        bufferCommands: true, // Enable command buffering
        maxPoolSize: 10,
      };

      globalMongoose.mongoose.promise = mongoose.connect(MONGODB_URI, opts);
    }

    globalMongoose.mongoose.conn = await globalMongoose.mongoose.promise;
    console.log("New MongoDB connection established");
    return globalMongoose.mongoose.conn;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
