import type { Mongoose } from "mongoose";
import { connect, connection } from "mongoose";

declare global {
  // Cache Mongoose connection for reuse in development
  // eslint-disable-next-line no-var
  var mongoose: {
    promise: Promise<Mongoose> | null;
    conn: Mongoose | null;
  };
}

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.local"
  );
}

// Maintain a cached connection to prevent multiple reconnections in development
let cached = global.mongoose;

if (!cached) {
  global.mongoose = { conn: null, promise: null };
  cached = global.mongoose;
}

async function dbConnect(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Prevent query buffering
    };

    cached.promise = connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("Connected to MongoDB successfully...");
        return mongoose;
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
        cached.promise = null; // Reset cached promise on failure
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.conn = null; // Reset cached connection on failure
    throw error;
  }

  return cached.conn;
}

// Mongoose connection event handlers
connection.on("connected", () => {
  console.log("Mongoose event: connected");
});

connection.on("error", (err) => {
  console.error("Mongoose event: error", err);
});

connection.on("disconnected", () => {
  console.log("Mongoose event: disconnected");
});

export default dbConnect;
