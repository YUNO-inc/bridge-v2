import { Viewport } from "next";
import BusinessTypes from "./_features/BusinessTypes/components/BusinessTypes";

export const viewport: Viewport = {
  themeColor: "#123524",
};

export default function Home() {
  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[3rem] tracking-[1.5rem] text-phthaloGreen font-dune">
      <BusinessTypes />
    </div>
  );
}
