import Image from "next/image";
import { nunito } from "@/app/fonts";
import PageControl from "@/app/_features/PageControl/PageControl";
import Button from "@/app/_features/Auth/components/Button";

export default function Page() {
  return (
    <>
      <div className="h-[100svh] w-[100vw] flex flex-col bg-background">
        <div className="relative flex flex-col items-center justify-center h-[60vw] bg-phthaloGreen">
          <div className="relative top-[-15px] w-[50vw] aspect-[50.4/29]">
            <Image
              src="/images/Dark-Text-Logo-Horizontal.png"
              alt="Large Bridge Logo (Green Color)"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-5 mx-auto">
            <PageControl text="Order hot meals and shawarma" />
          </div>
        </div>
        <div className="grow rounded-t-2xl relative top-[-16px] bg-background">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
