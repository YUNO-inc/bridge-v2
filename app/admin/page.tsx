import PageBackLink from "../_features/Button/PageBackLink";

function Page() {
  return (
    <div className="flex flex-col min-h-[100svh] p-4 text-xl">
      <PageBackLink text="Admin" className="mb-10" />
    </div>
  );
}

export default Page;
