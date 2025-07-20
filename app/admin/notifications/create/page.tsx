import PageBackLink from "@/app/_features/Button/PageBackLink";
import CreateNotificationForm from "@/app/_features/Forms/CreateNotificationForm";

function Page() {
  return (
    <div className="flex flex-col min-h-[100svh] p-4">
      <div className="flex items-center justify-between mb-10">
        <PageBackLink href="/admin" text="Back To Notifications" />
      </div>
      <div className="grow flex flex-col items-center">
        <div className="grow flex flex-col gap-3 w-full max-w-screen-sm px-4 items-center justify-between">
          <CreateNotificationForm />
        </div>
      </div>
    </div>
  );
}

export default Page;
