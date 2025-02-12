import { Viewport } from "next";
import PageBackLink from "../_features/Button/PageBackLink";
import Map from "../_features/Map/Map";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

function Page() {
  return (
    <div className="flex flex-col min-h-[100svh] p-4 text-xl ">
      <PageBackLink
        text="Address"
        className="bg-background py-0.5 pr-2 rounded-lg shadow-sgc"
      />
      <Map />
    </div>
  );
}

export default Page;
