import LocalIcons from "@/app/_utils/LocalIcons";
import IconAndText from "./IconAndText";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/app/_hooks/reduxHooks";
import { getCart } from "./cartSlice";
import { getSelectedAddress } from "../User/userSlice";
import {
  calcDeliveryPrice,
  calcDynamicDeliveryPrice,
} from "@/app/_utils/helpers";
import { BusinessDTO, DEFAULT_COORDS } from "@/app/_interfaces/interfaces";

function CartGroupDeliveryPrice({
  pickupPoint,
}: {
  pickupPoint: BusinessDTO["address"]["coordinates"];
}) {
  const { farthestPurchase } = useAppSelector(getCart);
  const selectedAddress = useAppSelector(getSelectedAddress);
  const deliveryPrice = calcDeliveryPrice(
    selectedAddress?.coordinates || DEFAULT_COORDS,
    pickupPoint
  );
  const [dynamicDeliveryPrice, setDynamicDeliveryPrice] =
    useState(deliveryPrice);
  const [currItemPickup] = useState(pickupPoint);
  const dpRef = useRef(deliveryPrice);

  useEffect(
    function () {
      function updateDeliveryPrice() {
        setDynamicDeliveryPrice(() =>
          calcDynamicDeliveryPrice({
            farthestPickup: farthestPurchase?.coordinates,
            deliveryPoint: selectedAddress?.coordinates || DEFAULT_COORDS,
            currItemPickup,
            deliveryPrice: dpRef.current,
            isInCart: false,
          })
        );
      }
      updateDeliveryPrice();
    },
    [farthestPurchase?.coordinates, selectedAddress, currItemPickup]
  );

  return (
    <IconAndText
      icon={
        <LocalIcons
          name="rider"
          className="w-3 h-3 fill-transparent"
          pathClassName={[
            "fill-phthaloGreen fill-opacity-[0.3] ",
            "stroke-phthaloGreen stroke-opacity-[0.3] ",
          ]}
        />
      }
      text={`₦${dpRef.current}`}
      discountedPrice={
        dynamicDeliveryPrice < dpRef.current ? `₦${dynamicDeliveryPrice}` : ""
      }
    />
  );
}

export default CartGroupDeliveryPrice;
