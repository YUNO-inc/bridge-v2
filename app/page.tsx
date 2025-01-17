import { Viewport } from "next";
import BusinessTypes from "./_features/BusinessTypes/components/BusinessTypes";
import Link from "next/link";
import { SignOutAction } from "./_lib/actions/auth/actions";
import Button from "./_features/Forms/Button";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function Home() {
  return (
    <div className="flex flex-col absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-sm text-phthaloGreen font-dune">
      <BusinessTypes />
      <Link href={"/auth/hey-number"}>Link to hey-number</Link>
      <form className="flex items-center flex-col" action={SignOutAction}>
        <Button type="submit" text="SignOut" theme="red" />
      </form>
    </div>
  );
}
