import {
  BUSINESS_TYPES,
  BusinessDTO,
  BusinessTypesDTO,
  ItemDTO,
} from "@/app/_interfaces/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  searchStr: string;
  loading: { isLoading: boolean; page: "search" | "default" };
  businessTypes: BusinessDTO["businessTypes"];
  selectedBusinessType: BusinessTypesDTO;
  businesses: BusinessDTO[];
  productResults: ItemDTO[];
};

const initialState: InitialState = {
  searchStr: "",
  loading: { isLoading: false, page: "default" },
  businessTypes: BUSINESS_TYPES,
  selectedBusinessType: BUSINESS_TYPES[0],
  businesses: [],
  productResults: [],
};

const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeSelectedBusinessType(
      state,
      action: PayloadAction<InitialState["selectedBusinessType"]>
    ) {
      state.selectedBusinessType = action.payload;
    },
  },
});

export const { changeSelectedBusinessType } = AppSlice.actions;

export const getAppData = (state: { app: InitialState }) => state.app;

const AppSliceReducer = AppSlice.reducer;
export default AppSliceReducer;
