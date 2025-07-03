import { GetMultipleBusinessesAction } from "@/app/_lib/business/actions";
import PageBackLink from "@/app/_features/Button/PageBackLink";
import Image from "next/image";
import BusinessIsOpenToggle from "@/app/_features/Admin/BusinessIsOpenToggle";

async function page() {
  const businesses = await GetMultipleBusinessesAction({});

  return (
    <div className="flex flex-col min-h-[100svh] py-4 text-xl">
      <PageBackLink href="/admin" text="Back To Admin" className="mb-10" />
      <div className="grow flex flex-col items-center">
        <div className="grow flex flex-col gap-3 w-full max-w-screen-sm px-4 items-center">
          <p className="self-start text-phthaloGreen text-xl font-extrabold">
            Business
          </p>
          <ul
            className="w-full flex flex-col px-1git add -A
          git commit -m ''"
          >
            {businesses.map((business) => (
              <li
                className="flex items-center justify-between border-b border-b-phthaloGreen border-opacity-10 py-3 text-base last:border-none"
                key={business.id}
              >
                <span className="flex items-center gap-[14px]">
                  <span className="relative w-9 h-9 rounded-full overflow-hidden">
                    <Image
                      src={business.profileImg}
                      alt={`Profile image of ${business.name}`}
                      fill
                      className="object-cover"
                    />
                  </span>
                  <span className="capitalize text-nowrap">
                    {business.name}
                  </span>
                </span>
                <BusinessIsOpenToggle
                  isOpen={business.isOpen}
                  id={business.id}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default page;
