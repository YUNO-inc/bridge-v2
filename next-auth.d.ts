import { DefaultSession } from "next-auth";
import { UserDTO } from "./app/_interfaces/interfaces";

declare module "next-auth" {
  type User = UserDTO;

  interface Session {
    user: User & DefaultSession["user"];
  }
}
