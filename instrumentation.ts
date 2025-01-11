import { connect } from "./app/_lib/db";

// instrumentation.ts
export async function register() {
  try {
    await connect();
    console.log("MongoDB connected successfully in instrumentation");
  } catch (error) {
    console.error("Failed to connect to MongoDB in instrumentation:", error);
    process.exit(1);
  }
}
