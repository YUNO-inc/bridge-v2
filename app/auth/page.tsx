import Image from "next/image";
import { nunito } from "@/app/fonts";
import PageControl from "@/app/_features/PageControl/PageControl";
import Button from "@/app/_features/Auth/components/Button";
import Link from "next/link";
import AuthSegmentedControl from "../_features/Auth/components/AuthSegmentedControl";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const availablePages = ["user", "business", "rider"];
  const page = (await searchParams)?.page || availablePages[0];

  return (
    <>
      <div className="h-[100svh] w-[100vw] flex flex-col bg-background md:items-center md:justify-center">
        <div className="relative flex flex-col items-center justify-center h-[60vw] bg-phthaloGreen md:bg-background md:h-auto md:gap-5">
          <div className="relative top-[-15px] w-[50vw] aspect-[50.4/29] md:w-[250px] md:top-[0] md:rounded-xl md:overflow-hidden">
            <Image
              src="/images/Dark-Text-Logo-Horizontal.png"
              alt="Large Bridge Logo (Green Color)"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-5 mx-auto md:relative md:bottom-0">
            <PageControl text="Order hot meals and shawarma" />
          </div>
        </div>
        <div className="grow flex flex-col rounded-t-2xl relative top-[-16px] bg-background md:top-[0] md:grow-0">
          <div
            className={`flex flex-col items-center text-center text-stone-900 pt-5 ${nunito.className}`}
          >
            <div>
              <h1 className="text-2xl font-black">Welcome</h1>
              <p className="font-extralight text-stone-500 text-sm">
                Sign in with your Gmail account.
              </p>
            </div>
            <div className="w-full py-3">
              <div className="flex flex-col items-center">
                <Button type="google" />
              </div>
              <div className="flex justify-center">
                <Link
                  href="/"
                  className="mt-7 text-stone-700 font-bold underline"
                >
                  Continue as a guest
                </Link>
              </div>
            </div>
          </div>
          <div className="grow flex justify-center items-end pb-10">
            <AuthSegmentedControl availablePages={availablePages} page={page} />
          </div>
        </div>
      </div>
    </>
  );
}
