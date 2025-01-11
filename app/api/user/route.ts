import { NextResponse } from "next/server";
import User from "@/app/_lib/models/user/model";
import { connect } from "@/app/_lib/db";

export async function GET() {
  await connect();
  const tasks = await User.find();
  return NextResponse.json(tasks);
}
