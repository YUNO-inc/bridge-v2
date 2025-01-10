import type _mongoose from "mongoose";
import { connect } from "mongoose";

declare global {
  // eslint-disable-next-line
  var mongoose: {
    promise: ReturnType<typeof connect> | null;
    conn: typeof _mongoose | null;
  };
}

const MONGODB_URI = <string>process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  global.mongoose = { conn: null, promise: null };
  cached = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log("CONN WAS CACHED", cached.conn);
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("DB connected successfully...");
      return mongoose;
    });
  }

  try {
    console.log("TRY:", "CACHED PROMISE", cached.conn, cached.promise);
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.log("MDB CONNECTION ERR", e);
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
