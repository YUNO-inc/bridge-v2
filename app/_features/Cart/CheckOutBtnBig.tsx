import { CartDTO } from "@/app/_interfaces/interfaces";

function CheckOutBtnBig({ priceTotal }: { priceTotal: CartDTO["priceTotal"] }) {
  return (
    <div className="rounded-full bg-[linear-gradient(white,#f8f8f8),url('/images/bg/paper.png')] mx-4 my-2">
      <div className="rounded-full p-4 text-white">
        <div></div>
        <div>{priceTotal}</div>
      </div>
    </div>
  );
}

export default CheckOutBtnBig;
