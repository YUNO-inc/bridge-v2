import { UserDTO } from "@/app/_interfaces/interfaces";
import { connect } from "../../db";
import User from "../../models/user/model";

export async function createUser(user: UserDTO) {
  await connect();
  const newUser = await User.create({ name: user.name, email: user.email });
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
