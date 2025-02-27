import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartDTO, ItemDTO } from "@/app/_interfaces/interfaces";

const initialState: CartDTO = {
  groups: [],
  deliveryTotal: 0,
  numTotalItems: 0,
  farthestPurchase: undefined,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ItemDTO>) {
      const newItem = action.payload;
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
      state.deliveryTotal += groupAlreadyExits
        ? 0
        : action.payload.ownerData.deliveryPrice;
    },
  },
});

export const { addToCart } = cartSlice.actions;

export const getCart = (state: { cart: CartDTO }) => state.cart;

export const isInCart = (state: { cart: CartDTO }) => state.cart;

const cartSliceReducer = cartSlice.reducer;
export default cartSliceReducer;

function createGroup(newItem: ItemDTO) {
  return {
    id: newItem.ownerData.id,
    name: newItem.ownerData.name,
    deliveryPrice: newItem.ownerData.deliveryPrice,
    items: [newItem],
    totalPrice: newItem.price,
  };
}
