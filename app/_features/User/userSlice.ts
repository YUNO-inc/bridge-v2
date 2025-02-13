import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDTO } from "@/app/_interfaces/interfaces";

type InitialState = {
  user: Partial<UserDTO> | undefined;
};

const initialState: InitialState = {
  user: undefined,
};

const isValidKey = (key: string): key is keyof UserDTO =>
  key in ({} as UserDTO);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Partial<UserDTO> | undefined>) {
      if (!action.payload) return;
      state.user = action.payload;
    },
    updateUser(state, action: PayloadAction<Partial<UserDTO> | undefined>) {
      const payload = action.payload;
      if (!(payload && state.user)) return;
      for (const key of Object.keys(payload)) {
        console.log("key: ", key, "ISVALID: ", isValidKey(key));
        if (!isValidKey(key)) continue;
        // state.user[key] = payload[key as keyof UserDTO];
      }
    },
  },
});

export const { setUser } = userSlice.actions;

export const getUser = (state: { user: InitialState }) => state.user.user;

const userSliceReducer = userSlice.reducer;
export default userSliceReducer;
