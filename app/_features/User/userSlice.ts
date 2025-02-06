import { createSlice } from "@reduxjs/toolkit";
import { UserDTO } from "@/app/_interfaces/interfaces";

type InitialState = {
  user: Partial<UserDTO> | undefined;
};

const initialState: InitialState = {
  user: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const getUser = (state: { user: InitialState }) => state.user.user;

const userSliceReducer = userSlice.reducer;
export default userSliceReducer;
