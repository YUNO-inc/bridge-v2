import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddressDTO, UserDTO } from "@/app/_interfaces/interfaces";

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
    setUser(state, action: PayloadAction<Partial<UserDTO> | undefined>) {
      if (!action.payload) return;
      state.user = action.payload;
    },
    // const isValidKey = (key: string): key is keyof UserDTO =>
    //   key in ({} as UserDTO);
    // updateUser(state, action: PayloadAction<Partial<UserDTO> | undefined>) {
    //   const payload = action.payload;
    //   if (!(payload && state.user)) return;
    //   for (const key of Object.keys(payload)) {
    //     console.log("key: ", key, "ISVALID: ", isValidKey(key));
    //     if (!isValidKey(key)) continue;
    //     // state.user[key] = payload[key as keyof UserDTO];
    //   }
    // },
    addNewAddress(state, action: PayloadAction<AddressDTO>) {
      if (!state.user) return;
      if (!state.user.addresses) state.user.addresses = [];
      state.user.addresses.push(action.payload);
    },
    changeAddress(state, action: PayloadAction<AddressDTO["id"]>) {
      const id = action.payload;
      if (!state.user) return;
      state.user.addresses?.forEach((address) => {
        if (address.id == id) address.isSelected = true;
        else address.isSelected = false;
      });
    },
  },
});

export const { setUser, addNewAddress, changeAddress } = userSlice.actions;

export const getUser = (state: { user: InitialState }) => state.user.user;

const userSliceReducer = userSlice.reducer;
export default userSliceReducer;
