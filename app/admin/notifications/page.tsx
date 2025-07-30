import Accordion from "@/app/_features/Accordion/Accordion";
import TwoDataTabs from "@/app/_features/Accordion/TwoDataTabs";
import MajorLinkClient from "@/app/_features/Button/MajorLinkClient";
import PageBackLink from "@/app/_features/Button/PageBackLink";
import { formatTime } from "@/app/_utils/helpers";
import { BellAlertIcon } from "@heroicons/react/24/outline";

async function Page() {
  const notifications = [
    {
      id: "144tegbsa3142625",
      title: "New Feature: Track your orders",
      body: "You can now track your deliveries in real time on bridge!, allowing you to better prepare and exoect your delivery. We impplemented this so you can watch as we process your delivery enhancing transparency.",
      createdAt: new Date("04-04-2135").toISOString(),
      deliveredTo: 0,
      openedBy: 0,
      appIsOpen: 1,
      wasOnline: 1,
    },
    {
      id: "144tegbsa31w4546325",
      title: "📦 Package Out for Delivery!",
      body: "Your order #84931 is on its way and will arrive today between 2:00 PM – 4:00 PM. Track your driver in real time.",
      createdAt: new Date().toISOString(),
      deliveredTo: 21,
      openedBy: 4,
      appIsOpen: 2,
      wasOnline: 1,
    },
  ];
  console.log(notifications);

  return (
    <div className="flex flex-col min-h-[100svh] p-4">
      <div className="flex items-center justify-between mb-10">
        <PageBackLink href="/admin" text="Back To Admin" />
        <MajorLinkClient
          text="Create Notification"
          href="/admin/notifications/create"
          isLink={false}
          className="w-fit text-xs bg-blue-500 text-blue-50 hover:bg-blue-400"
          icon={<BellAlertIcon className="stroke-current w-4 h-4" />}
        />
      </div>
      <div className="grow flex flex-col items-center">
        <div className="grow flex flex-col gap-3 w-full max-w-screen-sm px-4 items-center justify-between">
          <div className="flex flex-col gap-4 self-stretch">
            {notifications.map((noti) => (
              <Accordion
                key={noti.id}
                btnContent={
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <h3 className="font-black">{noti.title}</h3>
                      <span className="text-phthaloGreen text-opacity-[0.37]">
                        {formatTime(noti.createdAt)}
                      </span>
                    </div>
                    <p className="text-left text-phthaloGreen-300">
                      {noti.body}
                    </p>
                  </div>
                }
                expandContent={
                  <div className="flex flex-col gap-4 max-h-full">
                    <TwoDataTabs
                      tabs={[
                        {
                          title: "Delivered To",
                          value: String(noti.deliveredTo),
                        },
                        {
                          title: "Opened By",
                          value: String(noti.openedBy),
                        },
                      ]}
                    />
                    <TwoDataTabs
                      tabs={[
                        {
                          title: "App is Opened",
                          value: String(noti.appIsOpen),
                        },
                        {
                          title: "Was Online",
                          value: String(noti.wasOnline),
                        },
                      ]}
                    />
                  </div>
                }
                startsOpen={true}
                btnClassName="w-full py-4 flex items-center justify-between"
                contentActiveClassName="py-4 opacity-100"
                contentInactiveClassName="py-0 opacity-0"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
