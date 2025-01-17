import Image from "next/image";
import PageControl from "@/app/_features/PageControl/PageControl";
import { auth } from "../_lib/actions/auth/auth";
import { redirect } from "next/navigation";

async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!!session?.user) redirect("/");

  return (
    <div className="h-[100svh] w-[100vw] flex flex-col bg-background md:items-center md:mt-[11vh]">
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
        {children}
      </div>
    </div>
  );
}

export default Layout;
