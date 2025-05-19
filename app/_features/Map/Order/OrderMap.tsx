"use client";

// import dynamic from "next/dynamic";
import OrderMapModal from "../../Modals/OrderMapModal";
import { NarrowOrderDTO } from "@/app/_interfaces/interfaces";

// const Container = dynamic(() => import("./OrderMapContainer"), {
//   ssr: false,
// });

function OrderMap({ order }: { order: NarrowOrderDTO }) {
  return (
    <div className="full-viewport">
      {/* <Container className="w-full h-[78dvh] sm:h-dvh sm:w-[73vw]" /> */}
      <div className="w-full h-[78dvh] sm:h-dvh sm:w-[73vw]"></div>
      <OrderMapModal
        className={`w-svw min-w-min sm:h-dvh sm:w-[30vw] sm:rounded-l-2xl sm:rounded-r-none h-svh max-h-full overflow-auto`}
        // h-[40dvh]
        order={order}
      />
    </div>
  );
}

export default OrderMap;
