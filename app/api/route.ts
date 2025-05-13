import { NextResponse } from "next/server";
import User from "@/app/_lib/user/model";

export async function GET() {
  const tasks = await User.find();
  return NextResponse.json(tasks);
}
