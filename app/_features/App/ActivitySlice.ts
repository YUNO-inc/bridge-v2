import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  searchParams: string;
};

const initialState: InitialState = {
  searchParams: "",
};

const ActivitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    // duplicateItem(state, action: PayloadAction<ItemDTO>) {},
  },
});

// export const {  } = ActivitySlice.actions;

// export const isInCart = (state: { cart: CartDTO }) => state.cart;

const ActivitySliceReducer = ActivitySlice.reducer;
export default ActivitySliceReducer;
