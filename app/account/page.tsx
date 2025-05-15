import { Viewport } from "next";
import PageBackLink from "../_features/Button/PageBackLink";
import AccountForm from "../_features/Forms/AccountForm";
import SignOutBtn from "../_features/Button/SignOutBtn";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

async function Page() {
  return (
    <div className="flex flex-col min-h-[100svh] p-4 text-xl">
      <PageBackLink text="Account" className="mb-10" />
      <AccountForm />
      <SignOutBtn />
    </div>
  );
}

export default Page;
