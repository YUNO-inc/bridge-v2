import NumberForm from "@/app/_features/Auth/components/NumberForm";
import CheckAnimation from "@/app/_features/CheckAnimation/CheckAnimation";

function Page() {
  return (
    <div className="relative grow flex flex-col items-center text-center text-stone-900 pt-5">
      <CheckAnimation message="Congrats, you signed up successfully 🎉" />
      <NumberForm />
    </div>
  );
}

export default Page;
