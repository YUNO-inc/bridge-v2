import { redirect } from "next/navigation";
import { auth } from "../_lib/auth/auth";

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const user = session?.user;
  const ADMIN_IDS = process.env.NEXT_PUBLIC_ADMIN_IDS?.split?.(",") ?? [];
  if (!user || !ADMIN_IDS.includes(user.id || "")) redirect("/app");

  return <div>{children}</div>;
}

export default Layout;
