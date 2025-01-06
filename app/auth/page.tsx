import Image from "next/image";
import PageControl from "@/app/_features/PageControl/PageControl";

export default function Page() {
  return (
    <>
      <div className="h-[100svh] w-[100vw] flex flex-col">
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
        <div className="grow rounded-t-2xl relative top-[-16px] bg-background"></div>
      </div>
    </>
  );
}
