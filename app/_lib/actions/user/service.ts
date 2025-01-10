import User from "../../models/user/model";
import { UserI } from "./interfaces";

export async function createUser(user: UserI) {
  const newUser = await User.create({ name: user.name, email: user.email });
  console.log(newUser.name, "created successfully");
  return user;
}

export async function getUser(queryObj: Partial<UserI>) {
  const user = await User.findOne(queryObj);
  console.log(user?.name, "found");
  return user;
}
