"use client";

import { useAppSelector } from "@/app/_hooks/reduxHooks";
import { useEffect, useRef, useState } from "react";
import { getCart, businessIsInCart } from "../../Cart/cartSlice";
import {
  calcDeliveryPrice,
  calcDynamicDeliveryPrice,
} from "@/app/_utils/helpers";
import { getSelectedAddress } from "../../User/userSlice";
import { BusinessDTO, DEFAULT_COORDS } from "@/app/_interfaces/interfaces";

function EdibleItemDeliveryPrice({
  pickupPoint,
  businessId,
}: {
  pickupPoint: BusinessDTO["address"]["coordinates"];
  businessId: BusinessDTO["id"];
}) {
  const { farthestPurchase } = useAppSelector(getCart);
  const selectedAddress = useAppSelector(getSelectedAddress);
  const deliveryPrice = calcDeliveryPrice(
    selectedAddress?.coordinates || DEFAULT_COORDS,
    pickupPoint
  );
  const isInCart = useAppSelector(businessIsInCart(businessId));
  const [currItemPickup] = useState(pickupPoint);
  const [dynamicDeliveryPrice, setDynamicDeliveryPrice] =
    useState(deliveryPrice);
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
            isInCart,
          })
        );
      }
      updateDeliveryPrice();
    },
    [farthestPurchase, selectedAddress?.coordinates, currItemPickup, isInCart]
  );

  return (
    <div className="font-semibold">
      {dynamicDeliveryPrice > 0 ? `₦${dynamicDeliveryPrice}` : "Free"}
    </div>
  );
}

export default EdibleItemDeliveryPrice;
