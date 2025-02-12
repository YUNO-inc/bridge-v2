import { Viewport } from "next";
import PageBackLink from "../_features/Button/PageBackLink";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

function Page() {
  return (
    <div className="flex flex-col min-h-[100svh] p-4 text-xl">
      <PageBackLink text="Addresses" />
    </div>
  );
}

export default Page;
