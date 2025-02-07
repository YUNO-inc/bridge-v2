import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartDTO, ItemDTO } from "@/app/_interfaces/interfaces";

type InitialState = {
  cart: Partial<CartDTO>;
  delivery: number;
};

const initialState: InitialState = {
  cart: [],
  delivery: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ItemDTO>) {
      state.cart.push(action.payload);
      state.delivery += action.payload.ownerData.deliveryPrice;
    },
  },
});

export const { addToCart } = cartSlice.actions;

export const getCart = (state: { cart: InitialState }) => state.cart;

const cartSliceReducer = cartSlice.reducer;
export default cartSliceReducer;
