import PageBackLink from "@/app/_features/Button/PageBackLink";
import Aggregates from "@/app/_features/Admin/Aggregates";

async function Page() {
  return (
    <div className="flex flex-col min-h-[100svh] py-4 text-xl">
      <PageBackLink text="Admin" className="mb-10" />
      <Aggregates />
    </div>
  );
}

export default Page;
