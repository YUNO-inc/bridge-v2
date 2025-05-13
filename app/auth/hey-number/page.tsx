import NumberForm from "@/app/_features/Auth/components/NumberForm";
import CheckAnimation from "@/app/_features/CheckAnimation/CheckAnimation";
import { auth } from "@/app/_lib/auth/auth";
import { redirect } from "next/navigation";

async function Page() {
  const session = await auth();

  if (!!session?.user?.phoneNumber) redirect("/");
  if (!session?.user) redirect("/auth");

  return (
    <div className="relative grow flex flex-col items-center text-center text-stone-900 pt-5">
      <CheckAnimation message="Congrats, you signed up successfully 🎉" />
      <NumberForm />
    </div>
  );
}

export default Page;
