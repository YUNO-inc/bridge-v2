"use client";

import { SignedInNumberSubmitAction } from "@/app/_lib/actions/auth/actions";
import Button from "../../Forms/Button";
import HelperText from "../../Forms/HelperText";
import Inputs from "../../Forms/inputs";
import OutLink from "../../Forms/OutLink";
import { useState } from "react";

function NumberForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form
      action={SignedInNumberSubmitAction}
      className="grow flex flex-col max-w-[85vw] mt-6"
      onSubmit={() => setIsSubmitting((isSubmitting) => !isSubmitting)}
    >
      <div className="flex w-full gap-[6px] text-left">
        <Inputs
          type="select"
          selectOpt={[
            {
              value: "nigeria",
              text: "+234",
              png: "https://flagcdn.com/w320/ng.png",
            },
            {
              value: "usa",
              text: "+1",
              png: "https://flagcdn.com/w320/us.png",
            },
            {
              value: "ghana",
              text: "+24",
              png: "https://flagcdn.com/w320/gh.png",
            },
            {
              value: "togo",
              text: "+23",
              png: "https://flagcdn.com/w320/tg.png",
            },
          ]}
          className="max-w-[37.7%]"
        />
        <Inputs
          type="tel"
          label="Phone"
          placeHolder="08000000000"
          className="max-w-[60.5%]"
          name="phoneNumber"
        />
      </div>
      <HelperText
        className="text-left mt-1"
        helperText="This would be used to contact you when you order."
      />
      <Button
        text="Save and Continue"
        className="mt-2"
        type="submit"
        isLoading={isSubmitting}
      />
      <OutLink text="Skip for now" className="mt-auto mb-[34px] pt-3" />
    </form>
  );
}

export default NumberForm;
