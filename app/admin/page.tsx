import {
  BellAlertIcon,
  BuildingStorefrontIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/outline";
import MajorLink from "../_features/Button/MajorLink";
import PageBackLink from "../_features/Button/PageBackLink";
import { Package } from "@phosphor-icons/react/dist/ssr";

async function Page() {
  return (
    <div className="flex flex-col min-h-[100svh] py-4 text-xl">
      <PageBackLink text="Admin" className="mb-10" />
      <div className="grow flex flex-col items-center">
        <div className="grow flex flex-col gap-3 w-full max-w-screen-sm px-4 items-center justify-between">
          <ul className="w-full flex flex-col">
            <li className="border-b border-b-phthaloGreen border-opacity-10 py-3">
              <MajorLink
                icon={<Package className="stroke-current w-6 h-6" />}
                text="Orders"
                href="/admin/orders"
              />
            </li>
            <li className="border-b border-b-phthaloGreen border-opacity-10 py-3">
              <MajorLink
                icon={<SpeakerWaveIcon className="stroke-current w-6 h-6" />}
                text="Feedback / Bugs"
                href="/admin/feedbacks"
              />
            </li>
            <li className="py-3">
              <MajorLink
                icon={
                  <BuildingStorefrontIcon className="stroke-current w-6 h-6" />
                }
                text="Businesses"
                href="/admin/businesses"
              />
            </li>
            <li className="py-3">
              <MajorLink
                icon={<BellAlertIcon className="stroke-current w-6 h-6" />}
                text="Notifications"
                href="/admin/notifications"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Page;
