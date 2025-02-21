import PageBackLink from "@/app/_features/Button/PageBackLink";
import Map from "@/app/_features/Map/AddressMap";
import { Metadata } from "next";

export const metadata: Metadata = {
  viewport: {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
  },
};

function Page() {
  return (
    <div className="flex flex-col min-h-[100svh] bg-black-50">
      <PageBackLink className="absolute top-0 left-0 z-[9999] shadow-sgc rounded-full m-4 p-0.5 bg-white text-opacity-60" />
      <Map />
    </div>
  );
}

export default Page;
