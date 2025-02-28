import LocalIcons from "@/app/_utils/LocalIcons";

function EmptyCart({ closeCart }: { closeCart: () => void }) {
  return (
    <div className="mb-3 grow flex flex-col gap-3 items-center justify-center">
      <LocalIcons name="empty-cart" />
      <div className="font-semibold text-center text-phthaloGreen text-opacity-[0.37]">
        <div>Your cart is empty</div>
        <button className="underline" onClick={closeCart}>
          continue shopping
        </button>
      </div>
    </div>
  );
}

export default EmptyCart;
