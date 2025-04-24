import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import {
  AddressDTO,
  BusinessDTO,
  CartDTO,
  CartGroupDTO,
  DEFAULT_COORDS,
  ItemBusinessData,
  ItemDTO,
} from "@/app/_interfaces/interfaces";
import {
  calcDeliveryPrice,
  calcDynamicDeliveryPrice,
  isNewFarthestPoint,
  sortByFarthestPoint,
} from "@/app/_utils/helpers";

type InitialState = CartDTO;

const initialState: InitialState = {
  groups: [],
  deliveryTotal: 0,
  priceTotal: 0,
  numTotalItems: 0,
  farthestPurchase: undefined,
  pickupPoints: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<{
        item: ItemDTO;
        deliveryAddress: AddressDTO | undefined;
      }>
    ) {
      const deliveryAddress = action.payload.deliveryAddress;
      const newItem = { ...action.payload.item, createdAt: Date.now() };

      if (typeof newItem.businessData === "string")
        throw new Error("Unable to add to cart.");

      const numOfGroups = state.groups.length > 0;
      const isFarthestPurchase = isNewFarthestPoint({
        deliveryPoint: deliveryAddress?.coordinates,
        oldPoint: state.farthestPurchase?.coordinates,
        newPoint: newItem.businessData.address.coordinates,
      });
      let groupAlreadyExits = false;

      if (!numOfGroups) state.groups.push(createGroup(newItem));
      else if (numOfGroups) {
        groupAlreadyExits = state.groups.some((group, i) => {
          if (typeof newItem.businessData === "string")
            throw new Error("Unable to add to cart.");
          const groupFound = group.id === newItem.businessData.id;
          if (groupFound) {
            state.groups[i].items.push(newItem);
            state.groups[i].totalPrice += newItem.price;
          }
          return groupFound;
        });
        if (!groupAlreadyExits) state.groups.push(createGroup(newItem));
      }

      const totalDeliveryPrice = addToTotalDeliveryPrice(
        current(state.groups),
        newItem.businessData,
        isFarthestPurchase,
        deliveryAddress,
        state.farthestPurchase
      );

      state.numTotalItems += 1;
      state.priceTotal += newItem.price;
      state.deliveryTotal = totalDeliveryPrice;
      state.farthestPurchase = isFarthestPurchase
        ? newItem.businessData.address
        : state.farthestPurchase;
    },
    deleteFromCart(
      state,
      action: PayloadAction<{
        delId: ItemDTO["id"];
        delAddedAt: ItemDTO["createdAt"];
        delPrice: ItemDTO["price"];
        ownerId: ItemBusinessData["id"];
        deliveryAddress: AddressDTO;
      }>
    ) {
      const { delId, delAddedAt, delPrice, ownerId, deliveryAddress } =
        action.payload;
      const group = state.groups.find((group) => group.id === ownerId);
      if (!group) return;
      group.items = group.items.filter((item) => {
        const isDelItem = item.id === delId && item.createdAt === delAddedAt;
        if (isDelItem) group.totalPrice -= delPrice;
        return !isDelItem;
      });
      if (group.items.length < 1) {
        const sortedPickups = sortByFarthestPoint(
          deliveryAddress,
          current(state.groups).map((group) => group.address)
        );

        state.groups = state.groups.filter((group) => group.id !== ownerId);

        if (state.groups.length > 0) {
          const isFarthestPurchase = sortedPickups[0].id === group.address.id;
          state.farthestPurchase = isFarthestPurchase
            ? sortedPickups[1]
            : state.farthestPurchase;
          state.deliveryTotal = getTotalDeliveryPrice(
            state.groups,
            isFarthestPurchase
              ? sortedPickups[1]
              : current(state.farthestPurchase),
            deliveryAddress
          );
        } else {
          state.farthestPurchase = undefined;
          state.deliveryTotal = 0;
        }
      }

      state.numTotalItems -= 1;
      state.priceTotal -= delPrice;
    },
    updateTotalDeliveryPrice(
      state,
      action: PayloadAction<{ deliveryAddress: AddressDTO }>
    ) {
      state.deliveryTotal = getTotalDeliveryPrice(
        current(state.groups),
        current(state.farthestPurchase),
        action.payload.deliveryAddress
      );
    },
  },
});

export const { addToCart, deleteFromCart, updateTotalDeliveryPrice } =
  cartSlice.actions;

export const getCart = (state: { cart: CartDTO }) => state.cart;

export const businessIsInCart =
  (businessId: BusinessDTO["id"]) => (state: { cart: CartDTO }) =>
    state.cart.groups.some((group) => group.id === businessId);

const cartSliceReducer = cartSlice.reducer;
export default cartSliceReducer;

function createGroup(newItem: ItemDTO): CartGroupDTO {
  if (typeof newItem.businessData === "string")
    throw new Error("Unable to create a new Cart group.");

  return {
    id: newItem.businessData.id,
    name: newItem.businessData.name,
    deliveryPrice: newItem.businessData.deliveryPrice,
    items: [newItem],
    address: newItem.businessData.address,
    totalPrice: newItem.price,
  };
}

function addToTotalDeliveryPrice(
  groups: InitialState["groups"],
  businessData: ItemDTO["businessData"],
  isFarthestPurchase: boolean,
  deliveryAddress: AddressDTO | undefined,
  stateFarthestPurchase: InitialState["farthestPurchase"]
) {
  if (typeof businessData === "string")
    throw new Error("Unable to add to cart.");
  const farthestPurchase =
    isFarthestPurchase && typeof businessData !== "string"
      ? businessData.address
      : current(stateFarthestPurchase);

  const totalDP = getTotalDeliveryPrice(
    groups,
    farthestPurchase,
    deliveryAddress
  );
  return totalDP;
}

function getTotalDeliveryPrice(
  groups: InitialState["groups"],
  farthestPurchase: InitialState["farthestPurchase"],
  deliveryAddress: AddressDTO | undefined
) {
  return groups.reduce((acc, group) => {
    const deliveryPoint = deliveryAddress?.coordinates || DEFAULT_COORDS;
    const currItemPickup = group.address.coordinates;
    const dp = calcDynamicDeliveryPrice({
      farthestPickup: farthestPurchase?.coordinates,
      deliveryPoint,
      currItemPickup,
      deliveryPrice: calcDeliveryPrice(deliveryPoint, currItemPickup),
      isInCart: false,
    });
    return acc + dp;
  }, 0);
}
