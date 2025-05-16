import { redirect } from "next/navigation";
import { auth } from "../_lib/auth/auth";
import { getADMIN_IDS } from "../_utils/helpers";

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const user = session?.user;
  const ADMIN_IDS = getADMIN_IDS();

  if (process.env.NODE_ENV !== "development") {
    if (!user || !ADMIN_IDS.includes(user.id || "")) redirect("/app");
  }

  return <div>{children}</div>;
}

export default Layout;
