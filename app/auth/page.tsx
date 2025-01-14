import Button from "@/app/_features/Auth/components/Button";
import Link from "next/link";
import AuthSegmentedControl from "../_features/Auth/components/AuthSegmentedControl";
import { SignInAction } from "../_lib/actions/auth/actions";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function Page({ searchParams }: PageProps) {
  const availablePages = ["user", "business", "rider"];
  const page = (await searchParams)?.page || availablePages[0];

  return (
    <>
      <div
        className={`flex flex-col items-center text-center text-stone-900 pt-5`}
      >
        <div>
          <h1 className="text-2xl font-black">Welcome</h1>
          <p className="font-extralight text-stone-500 text-sm">
            Sign in with your Gmail account.
          </p>
        </div>
        <div className="w-full py-3">
          <form className="flex flex-col items-center" action={SignInAction}>
            <Button type="google" />
          </form>
          <div className="flex justify-center">
            <Link href="/" className="mt-7 text-stone-700 font-bold underline">
              Continue as a guest
            </Link>
          </div>
        </div>
      </div>
      <div className="grow flex justify-center items-end pb-6">
        <AuthSegmentedControl availablePages={availablePages} page={page} />
      </div>
    </>
  );
}
