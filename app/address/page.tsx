import { Viewport } from "next";
import PageBackLink from "../_features/Button/PageBackLink";
import MajorLinkClient from "../_features/Button/MajorLinkClient";
import { MapPinIcon } from "@heroicons/react/24/outline";
import AddressRadios from "../_features/Forms/AddressRadios";
import { NavigationArrow } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

function Page() {
  return (
    <div className="flex flex-col min-h-[100svh] p-4 text-xl ">
      <div className="flex justify-between items-center">
        <PageBackLink text="Address" />
        <MajorLinkClient
          elementType="button"
          text="Add New Address"
          isLink={false}
          className="w-fit text-xs bg-blue-500 text-blue-50 hover:bg-blue-400"
          icon={<MapPinIcon className="stroke-current w-4 h-4" />}
        />
      </div>
      <AddressRadios />
      <Link
        href={"#"}
        className="flex items-center gap-1 w-fit text-sm font-semibold text-blue-500  transition-all hover:underline"
      >
        <NavigationArrow weight="fill" className="rotateX-180 w-5 h-5" />
        <span className="relative -bottom-0.5">Use your current location</span>
      </Link>
    </div>
  );
}

export default Page;
