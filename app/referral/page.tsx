import { headers } from "next/headers";
import { redirect } from "next/navigation";
import PageBackLink from "../_features/Button/PageBackLink";
import Image from "next/image";
import LocalIcons from "../_utils/LocalIcons";
import AvailableBalance from "../_features/Referral/AvailableBalance";
import { auth } from "../_lib/auth/auth";
import { GetMyRefData } from "../_lib/referral/actions";
import ScanQRBtn from "../_features/Referral/ScanQRBtn";
import ShareURLBtn from "../_features/Referral/ShareURLBtn";
import ReferralHistory from "../_features/Referral/ReferralHistory";
import OnlyRefLink from "../_features/Referral/OnlyRefLink";

async function Page() {
  const session = await auth();
  const user = session?.user;
  const refPageVisits = user?.refPageVisits || "None";

  if (!user || !user.id) {
    if (process.env.NODE_ENV !== "development") redirect("/auth");
  }

  const headersList = await headers();
  const host = headersList.get("host");
  const proto = headersList.get("x-forwarded-proto") || "http";
  const origin = `${proto}://${host}/auth?ref=${user?.id}`;

  const {
    totalActivePrizePrice,
    totalWithdrawnPrizePrice,
    newRefs,
    withdrawnRefs,
  } = await GetMyRefData();
  const totalEarnPrizePrice = totalActivePrizePrice + totalWithdrawnPrizePrice;
  const allReferrals = [...newRefs, ...withdrawnRefs];

  return (
    <div className="flex flex-col justify-between min-h-[100svh] p-4">
      <PageBackLink text="Referral" className="mb-5" />
      <div className="grow flex flex-col items-center">
        <div className="grow flex flex-col gap-3 w-full max-w-screen-sm">
          <AvailableBalance totalActivePrizePrice={totalActivePrizePrice} />
          <div className="bg-phthaloGreen bg-opacity-10 flex flex-col items-center p-4 rounded-[16px]">
            <div className="w-full flex justify-between text-center text-xs mb-6 text-phthaloGreen">
              <div className="relative flex flex-col items-center justify-between gap-2 basis-[30%] bg-white rounded-[8px] px-1 py-2">
                <Image
                  src={"/images/ref-logos/referral-invite.png"}
                  width={50}
                  height={50}
                  alt="Icon for Referal Invite"
                  className="rounded-full"
                />
                <p>Send Invitation to friend</p>
                <LocalIcons
                  name="scribbled-direction"
                  className="absolute w-6 h-6 top-0 -right-[12px] rotateX-180"
                />
              </div>
              <div className="relative flex flex-col items-center justify-between gap-2 basis-[30%] bg-white rounded-[8px] px-1 py-2">
                <Image
                  src={"/images/ref-logos/verify-referral.png"}
                  width={50}
                  height={50}
                  alt="Icon for Referal Invite"
                  className="rounded-full"
                />
                <p>Friend verifies details</p>
                <LocalIcons
                  name="scribbled-direction"
                  className="absolute w-6 h-6 top-0 -right-[12px] rotateX-180"
                />
              </div>
              <div className="relative flex flex-col items-center justify-between gap-2 basis-[30%] bg-white rounded-[8px] px-1 py-2">
                <Image
                  src={"/images/ref-logos/receive-referral-money-2.png"}
                  width={50}
                  height={50}
                  alt="Icon for Referal Invite"
                  className="rounded-full"
                />
                <p>You receive your cash</p>
              </div>
            </div>
            <button className="bg-phthaloGreen rounded-full text-white p-3 w-full">
              Withdraw your cash ₦
            </button>
          </div>
          <div className="bg-phthaloGreen bg-opacity-10 flex flex-col items-center gap-4 p-4 rounded-[16px] text-phthaloGreen">
            <div className="w-full bg-white flex justify-center rounded-[16px] overflow-hidden">
              <div className="relative max-w-[400px] rounded-[16px] aspect-[2.55/1] w-full">
                <Image
                  src="/images/ref-logos/hands-2.png"
                  alt="Hero Image"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-full text-center text-xs font-bold">
              <div className="flex justify-around w-full">
                <ShareURLBtn origin={origin} />
                <ScanQRBtn origin={origin} />
              </div>
              <OnlyRefLink url={origin} />
            </div>
          </div>
          <ReferralHistory
            totalEarnPrizePrice={totalEarnPrizePrice}
            refPageVisits={refPageVisits}
            allReferrals={allReferrals}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
