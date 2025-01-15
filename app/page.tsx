import { Viewport } from "next";
import BusinessTypes from "./_features/BusinessTypes/components/BusinessTypes";
import { CreateUserAction } from "./_lib/actions/user/actions";
import Link from "next/link";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function Home() {
  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[3rem] tracking-[1.5rem] text-phthaloGreen font-dune">
      <BusinessTypes />
      <Link href={"/auth/hey-number"}>Link to hey-number</Link>
      <form className="flex items-center flex-col" action={CreateUserAction}>
        <label>Name</label>
        <input
          type="text"
          placeholder="username"
          name="name"
          className="w-[40vw]"
        />
        <button type="submit" className="mt-8">
          Submit
        </button>
      </form>
    </div>
  );
}
