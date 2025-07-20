import { PhoneArrowUpRightIcon } from "@heroicons/react/24/outline";
import MajorLinkClient from "../_features/Button/MajorLinkClient";
import PageBackLink from "../_features/Button/PageBackLink";
import FeedBackForm from "../_features/Forms/FeedBackForm";
import { Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";

function Page() {
  return (
    <div className="flex flex-col justify-between min-h-[100svh] p-4">
      <div className="flex justify-between items-center">
        <PageBackLink text="Feedback" />
        <MajorLinkClient
          text="Call us"
          href="tel:+2347085630799"
          isLink={false}
          className="w-fit text-xs bg-blue-500 text-blue-50 hover:bg-blue-400"
          icon={<PhoneArrowUpRightIcon className="stroke-current w-4 h-4" />}
        />
      </div>
      <div className="flex flex-col grow justify-between my-8 gap-4 text-phthaloGreen">
        <FeedBackForm />
        <div
          className="bg-phthaloGreen
         bg-opacity-10 flex justify-between items-center mx-auto p-3 gap-1 w-full max-w-[400px] rounded-full border border-phthaloGreen border-opacity-10 text-phthaloGreen text-opacity-[0.60]"
        >
          <p className="font-semibold">Contact us Via</p>
          <div className="flex justify-center gap-4 text-xs">
            <a
              href="tel:+2347085630799"
              className="bg-white h-10 w-10
               rounded-full flex justify-center items-center shadow-sgc-light"
            >
              <span className="flex flex-col items-center">
                <Phone
                  weight="regular"
                  className="w-5 h-5 text-phthaloGreen text-opacity-[0.60] fill-current"
                />
              </span>
            </a>
            <a
              href="https://wa.me/+2347085630799?text=Hello%20Bridge%20Inc%2C%20I%20would%20like%20give%20a%20feedback."
              className="bg-white h-10 w-10
               rounded-full flex justify-center items-center shadow-sgc-light"
            >
              <span className="flex flex-col items-center">
                <WhatsappLogo
                  weight="regular"
                  className="w-5 h-5 text-phthaloGreen text-opacity-[0.60] fill-current"
                />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
