import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CartDTO,
  CartGroupDTO,
  ItemBusinessData,
  ItemDTO,
} from "@/app/_interfaces/interfaces";

const initialState: CartDTO = {
  groups: [],
  deliveryTotal: 0,
  priceTotal: 0,
  numTotalItems: 0,
  farthestPurchase: undefined,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ItemDTO>) {
      const newItem = { ...action.payload, createdAt: Date.now() };

      if (typeof newItem.businessData === "string")
        throw new Error("Unable to add to cart.");

      const numOfGroups = state.groups.length > 0;
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

      console.log(state.groups[0]);
      state.numTotalItems += 1;
      state.priceTotal += newItem.price;
      state.deliveryTotal += groupAlreadyExits
        ? 0
        : newItem.businessData.deliveryPrice;
    },
    deleteFromCart(
      state,
      action: PayloadAction<{
        delId: ItemDTO["id"];
        delAddedAt: ItemDTO["createdAt"];
        delPrice: ItemDTO["price"];
        ownerId: ItemBusinessData["id"];
      }>
    ) {
      const { delId, delAddedAt, delPrice, ownerId } = action.payload;
      const group = state.groups.find((group) => group.id === ownerId);
      if (!group) return;
      group.items = group.items.filter((item) => {
        const isDelItem = item.id === delId && item.createdAt === delAddedAt;
        if (isDelItem) group.totalPrice -= delPrice;
        return !isDelItem;
      });
      if (group.items.length < 1) {
        state.groups = state.groups.filter((group) => group.id !== ownerId);
        state.deliveryTotal = state.deliveryTotal - group.deliveryPrice;
      }

      state.numTotalItems -= 1;
      state.priceTotal -= delPrice;
    },
  },
});

export const { addToCart, deleteFromCart } = cartSlice.actions;

export const getCart = (state: { cart: CartDTO }) => state.cart;

export const isInCart = (state: { cart: CartDTO }) => state.cart;

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
