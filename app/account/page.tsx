import PageBackLink from "../_features/Button/PageBackLink";
import AccountForm from "../_features/Forms/AccountForm";
import SignOutBtn from "../_features/Button/SignOutBtn";

async function Page() {
  //   if (!user) redirect("/");

  return (
    <div className="flex flex-col min-h-[100svh] p-4 text-xl">
      <PageBackLink text="Account" />
      <AccountForm />
      <SignOutBtn />
    </div>
  );
}

export default Page;
