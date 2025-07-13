import { UserDTO } from "@/app/_interfaces/interfaces";
import { connect } from "../db";
import User from "./model";
import { auth } from "../auth/auth";

export async function createUser(user: Omit<UserDTO, "createdAt">) {
  await connect();
  const newUser = await User.create({
    name: user.name,
    email: user.email,
    referrer: user.referrer,
  });
  return newUser;
}

export async function getUser(queryObj: Partial<UserDTO>) {
  await connect();
  const user = await User.findOne(queryObj);
  return user;
}

export async function updateUserById(id: string, updateObj: Partial<UserDTO>) {
  await connect();
  const user = await User.findByIdAndUpdate(id, updateObj, { new: true });
  return user;
}

export async function updateMe(updateObj: Partial<UserDTO>) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error();
    const id = session.user.id;
    await connect();
    const user = await User.findByIdAndUpdate(id, updateObj, { new: true });
    if (!user)
      throw new Error(
        "You are logged in but your data is missing in our database."
      );
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to update user");
  }
}
