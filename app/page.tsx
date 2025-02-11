import { Viewport } from "next";
import ActivityControls from "@/app/_features/App/ActivityControls";
import ProfileImage from "./_features/ProfileImage/ProfileImage";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default async function Home() {
  return (
    <div className="relative flex flex-col min-h-[100svh]">
      <ProfileImage />
      <ActivityControls />
    </div>
  );
}
