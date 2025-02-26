import PageBackLinkClient from "@/app/_features/Button/PageBackLinkClient";
import Map from "@/app/_features/Map/AddressMap";
import { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#333333",
};

function Page() {
  return (
    <div className="flex flex-col min-h-[100svh] bg-black-50">
      <PageBackLinkClient className="absolute top-0 left-0 z-[9999] shadow-sgc rounded-full m-4 p-0.5 bg-white text-opacity-60" />
      <Map />
    </div>
  );
}

export default Page;
