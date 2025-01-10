import { auth } from "@/app/_lib/actions/auth/auth";
import Link from "next/link";

export default async function BusinessTypes() {
  const session = await auth();
  const user = session?.user;

  if (!user) return <Link href={"/auth"}>Bridge</Link>;

  return <Link href={"/auth"}>Welcome, {user.name}</Link>;
}
