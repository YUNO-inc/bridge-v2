import { createSlice } from "@reduxjs/toolkit";
import { CartDTO } from "@/app/_interfaces/interfaces";

type InitialState = {
  cart: Partial<CartDTO> | [];
};

const initialState: InitialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // setUser(state, action) {
    //   state.user = action.payload;
    // },
  },
});

// export const { setUser } = cartSlice.actions;

// export const getUser = (state: { user: InitialState }) => state.user.user;

const cartSliceReducer = cartSlice.reducer;
export default cartSliceReducer;
