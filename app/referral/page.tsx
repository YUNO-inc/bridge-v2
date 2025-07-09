import { EyeIcon } from "@heroicons/react/24/outline";
import PageBackLink from "../_features/Button/PageBackLink";
import Image from "next/image";
import LocalIcons from "../_utils/LocalIcons";

function Page() {
  return (
    <div className="flex flex-col justify-between min-h-[100svh] p-4">
      <PageBackLink text="Feedback" className="mb-5" />
      <div className="grow flex flex-col items-center">
        <div className="grow flex flex-col gap-3 w-full max-w-screen-sm">
          <div className="bg-phthaloGreen bg-opacity-10 w-full text-phthaloGreen px-4 rounded-[16px] text-sm border border-phthaloGreen border-opacity-[0.37]">
            <div className="flex items-center gap-3 pt-4">
              <span>Available Balance</span>
              <EyeIcon className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold pt-2 pb-4">
              <span>₦4,000.00</span>
            </div>
          </div>
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
                <svg
                  width="115"
                  height="54"
                  viewBox="0 0 115 54"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute w-6 h-6 top-0 -right-[12px] rotateX-180"
                >
                  <path
                    d="M46.6786 40.3725C61.4066 50.9624 82.5565 47.5399 103.355 31.2411C98.7279 30.1339 93.9338 34.929 89.9424 30.7316C90.0342 29.9344 89.9404 29.1584 90.1618 29.0568C96.7995 26.0063 103.401 22.8583 110.17 20.1196C112.461 19.1925 114.975 20.4224 114.986 23.1219C115.01 28.8057 115.215 34.6018 112.67 41.0744C110.705 38.5065 109.333 36.7145 108.308 35.3744C101.892 39.5994 95.9067 44.2888 89.2735 47.7597C73.6111 55.9552 57.7367 56.4875 42.309 46.9079C39.8651 45.3903 37.9849 45.6834 35.4894 46.507C25.0222 49.9607 15.033 48.6669 6.00484 42.3393C2.72202 40.0383 -0.742138 37.3491 0.139203 31.2108C4.53548 37.4897 9.96866 40.7104 16.4608 42.1416C22.82 43.5437 29.076 43.6636 34.9295 40.5913C33.8745 34.7585 32.1794 29.3042 32.0965 23.8259C32.0135 18.3411 32.8735 12.622 34.5482 7.39248C36.2673 2.02354 41.233 -0.450914 46.0677 0.0673848C50.893 0.584466 54.5306 4.10921 55.5744 9.86832C57.2145 18.9182 55.176 27.3222 50.3493 35.0915C49.2179 36.9128 47.9024 38.6219 46.6786 40.3725ZM42.1427 35.9516C48.4797 28.6021 50.4746 21.0539 49.6739 12.6027C49.4127 9.84581 48.6386 7.07431 45.1988 6.91179C42.2478 6.7724 40.929 9.10946 40.2529 11.497C38.0163 19.3952 38.4462 27.1457 42.1427 35.9516Z"
                    className="fill-blue-800/80"
                  />
                </svg>
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
        </div>
      </div>
    </div>
  );
}

export default Page;
