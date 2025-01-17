import { DefaultSession } from "next-auth";
import { UserI } from "@/app/_lib/actions/user/interfaces";

declare module "next-auth" {
  type User = UserI;

  interface Session {
    user: User & DefaultSession["user"];
  }
}
