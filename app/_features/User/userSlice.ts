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

    addNewAddress(state, action: PayloadAction<AddressDTO>) {
      if (!state.user) return;
      if (!state.user.addresses) state.user.addresses = [];
      state.user.addresses.push(action.payload);
    },
    deleteAddress(state, action: PayloadAction<AddressDTO["id"]>) {
      if (!(state.user && state.user.addresses?.length)) return;
      state.user.addresses = state.user.addresses.filter(
        (address) => address.id !== action.payload
      );
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

export const { setUser, addNewAddress, changeAddress, deleteAddress } =
  userSlice.actions;

export const getUser = (state: { user: InitialState }) => state.user.user;
export const getSelectedAddress = (state: { user: InitialState }) => {
  if (!state.user.user?.addresses?.length) return undefined;
  else return state.user.user.addresses.find((a) => a.isSelected === true);
};

const userSliceReducer = userSlice.reducer;
export default userSliceReducer;
