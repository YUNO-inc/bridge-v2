import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddressDTO, UserDTO } from "@/app/_interfaces/interfaces";

type InitialState = {
  user: Partial<UserDTO> | undefined;
  selectedAddress: AddressDTO | undefined;
};

const initialState: InitialState = {
  user: undefined,
  selectedAddress: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Partial<UserDTO> | undefined>) {
      if (!action.payload) return;
      state.user = action.payload;
      state.selectedAddress = action.payload?.addresses?.find?.(
        (a) => a.isSelected === true
      );
    },

    addNewAddress(state, action: PayloadAction<AddressDTO>) {
      if (!state.user) return;
      if (!state.user.addresses) state.user.addresses = [];
      state.user.addresses.push(action.payload);
      state.selectedAddress = action.payload;
    },
    deleteAddress(state, action: PayloadAction<AddressDTO["id"]>) {
      if (!(state.user && state.user.addresses?.length)) return;
      state.user.addresses = state.user.addresses.filter(
        (address) => address.id !== action.payload
      );
      if (state.selectedAddress?.id === action.payload)
        state.selectedAddress = state.user.addresses?.[0];
    },
    changeAddress(state, action: PayloadAction<AddressDTO["id"]>) {
      const id = action.payload;
      if (!state.user) return;
      state.user.addresses?.forEach((address) => {
        if (address.id == id) {
          address.isSelected = true;
          state.selectedAddress = address;
        } else address.isSelected = false;
      });
    },
  },
});

export const { setUser, addNewAddress, changeAddress, deleteAddress } =
  userSlice.actions;

export const getUser = (state: { user: InitialState }) => state.user.user;
export const getSelectedAddress = (state: {
  user: InitialState;
}): AddressDTO | undefined => {
  if (!state.user.user?.addresses?.length || !state.user.selectedAddress)
    return undefined;
  else return state.user.selectedAddress;
};

const userSliceReducer = userSlice.reducer;
export default userSliceReducer;
