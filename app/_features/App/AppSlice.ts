import {
  ActivityType,
  BUSINESS_TYPES,
  BusinessDTO,
  BusinessTypesDTO,
  ItemDTO,
} from "@/app/_interfaces/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  searchStr: string;
  loading: { isLoading: boolean; page: ActivityType };
  businessTypes: BusinessDTO["businessTypes"];
  placeholders: string[];
  selectedBusinessType: BusinessTypesDTO;
  businesses: BusinessDTO[];
  productResults: ItemDTO[];
};

const initialState: InitialState = {
  searchStr: "",
  loading: { isLoading: false, page: "default" },
  businessTypes: BUSINESS_TYPES,
  placeholders: [
    "What type of sharwarma?",
    "What's the name of the meal?",
    "What medicine or pharmaceiticals?",
  ],
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
    setLoading(state, action: PayloadAction<Partial<InitialState["loading"]>>) {
      state.loading.isLoading = action.payload.isLoading || false;
      state.loading.page = action.payload.page || "default";
    },
  },
});

export const { changeSelectedBusinessType, setLoading } = AppSlice.actions;

export const getAppData = (state: { app: InitialState }) => state.app;

const AppSliceReducer = AppSlice.reducer;
export default AppSliceReducer;
