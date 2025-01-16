import { connect } from "../../db";
import User from "../../models/user/model";
import { UserI } from "./interfaces";

export async function createUser(user: UserI) {
  await connect();
  const newUser = await User.create({ name: user.name, email: user.email });
  return newUser;
}

export async function getUser(queryObj: Partial<UserI>) {
  await connect();
  const user = await User.findOne(queryObj);
  return user;
}

export async function updateUserById(id: string, updateObj: Partial<UserI>) {
  await connect();
  const user = await User.findByIdAndUpdate(id, updateObj, { new: true });
  return user;
}
