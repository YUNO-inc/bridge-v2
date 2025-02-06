import { Viewport } from "next";
import ActivityControls from "@/app/_features/App/ActivityControls";
import ProfileImage from "./_features/ProfileImage/ProfileImage";
import { auth } from "./_lib/actions/auth/auth";
import StoreProvider from "./_store/StoreProvider";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default async function Home() {
  const session = await auth();

  return (
    <StoreProvider user={session?.user}>
      <div className="relative flex flex-col min-h-[100svh]">
        <ProfileImage />
        <ActivityControls />
      </div>
    </StoreProvider>
  );
}
