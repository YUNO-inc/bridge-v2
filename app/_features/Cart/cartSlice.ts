import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartDTO, ItemDTO } from "@/app/_interfaces/interfaces";

const initialState: CartDTO = {
  items: [],
  delivery: 0,
  farthestBusiness: undefined,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ItemDTO>) {
      state.items.push(action.payload);
      state.delivery += action.payload.ownerData.deliveryPrice;
    },
  },
});

export const { addToCart } = cartSlice.actions;

export const getCart = (state: { cart: CartDTO }) => state.cart;

const cartSliceReducer = cartSlice.reducer;
export default cartSliceReducer;
