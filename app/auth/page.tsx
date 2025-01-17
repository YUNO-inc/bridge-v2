import { redirect } from "next/navigation";
import Button from "@/app/_features/Auth/components/Button";
import AuthSegmentedControl from "../_features/Auth/components/AuthSegmentedControl";
import { SignInAction } from "../_lib/actions/auth/actions";
import OutLink from "../_features/Forms/OutLink";
import { auth } from "../_lib/actions/auth/auth";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function Page({ searchParams }: PageProps) {
  const session = await auth();
  if (!!session?.user) redirect("/");

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
            <OutLink text="Continue as a guest" />
          </div>
        </div>
      </div>
      <div className="grow flex justify-center items-end pb-6">
        <AuthSegmentedControl availablePages={availablePages} page={page} />
      </div>
    </>
  );
}
