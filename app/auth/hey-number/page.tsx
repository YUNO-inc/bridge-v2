import CheckAnimation from "@/app/_features/CheckAnimation/CheckAnimation";
import HelperText from "@/app/_features/Forms/HelperText";
import Inputs from "@/app/_features/Forms/inputs";

function Page() {
  return (
    <div className="flex flex-col items-center text-center text-stone-900 pt-5">
      <CheckAnimation message="Congrats, you signed up successfully 🎉" />
      <div className="max-w-[85vw]">
        <div className="flex w-full gap-[6px] text-left">
          <Inputs
            type="select"
            placeHolder="81234567"
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
          />
        </div>
        <HelperText
          className="text-left mt-1"
          helperText="This would be used to contact you when you order."
        />
      </div>
    </div>
  );
}

export default Page;
