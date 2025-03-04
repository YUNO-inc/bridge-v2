import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartDTO, CartGroupDTO, ItemDTO } from "@/app/_interfaces/interfaces";

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
      const newItem = action.payload;
      newItem.addedAt = Date.now();
      const numOfGroups = state.groups.length > 0;
      let groupAlreadyExits = false;

      if (!numOfGroups) state.groups.push(createGroup(newItem));
      else if (numOfGroups) {
        groupAlreadyExits = state.groups.some((group, i) => {
          const groupFound = group.id === newItem.ownerData.id;
          if (groupFound) {
            state.groups[i].items.push(newItem);
            state.groups[i].totalPrice += newItem.price;
          }
          return groupFound;
        });
        if (!groupAlreadyExits) state.groups.push(createGroup(newItem));
      }

      state.numTotalItems += 1;
      state.priceTotal += newItem.price;
      state.deliveryTotal += groupAlreadyExits
        ? 0
        : newItem.ownerData.deliveryPrice;
    },
    deleteFromCart(
      state,
      action: PayloadAction<{
        delId: ItemDTO["id"];
        delAddedAt: ItemDTO["addedAt"];
        delPrice: ItemDTO["price"];
        ownerId: ItemDTO["ownerData"]["id"];
      }>
    ) {
      const { delId, delAddedAt, delPrice, ownerId } = action.payload;
      const group = state.groups.find((group) => group.id === ownerId);
      if (!group) return;
      group.items = group.items.filter((item) => {
        const isDelItem = item.id === delId && item.addedAt === delAddedAt;
        if (isDelItem) group.totalPrice -= delPrice;
        return !isDelItem;
      });
      if (group.items.length < 1)
        state.groups = state.groups.filter((group) => group.id !== ownerId);

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
  return {
    id: newItem.ownerData.id,
    name: newItem.ownerData.name,
    deliveryPrice: newItem.ownerData.deliveryPrice,
    items: [newItem],
    totalPrice: newItem.price,
  };
}
