"use server";

import validator from "validator";
import { createUser } from "./service";

export async function CreateUserAction(formdata: FormData) {
  const name = formdata.get("name");
  const email = formdata.get("email");

  if (
    !(
      typeof name === "string" &&
      typeof email === "string" &&
      validator.isEmail(email)
    )
  )
    throw new Error("Invalid name value.");

  createUser({ name, email });
  // return newUser;
}
