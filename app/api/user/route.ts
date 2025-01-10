import { NextResponse } from "next/server";
import User from "@/app/_lib/models/user/model";
import dbConnect from "@/app/_lib/db";

export async function GET() {
  await dbConnect();
  const tasks = await User.find();
  return NextResponse.json(tasks);
}
