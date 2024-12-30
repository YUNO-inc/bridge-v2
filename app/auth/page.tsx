import Head from "next/head";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <Head>
        <meta name="theme-color" content={process.env.THEME_COLOR} />
      </Head>
      <div className="h-[100svh] w-[100vw] flex flex-col">
        <div className="flex items-center justify-center h-[60vw] bg-phthaloGreen">
          <div className="relative w-[45vw] aspect-[50.4/29]">
            <Image
              src="/images/Dark-Text-Logo-Horizontal.png"
              alt="Large Bridge Logo (Green Color)"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="grow rounded-t-2xl relative top-[-16px] bg-background"></div>
      </div>
    </>
  );
}
