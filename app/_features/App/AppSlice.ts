import {
  ActivityType,
  AppModalDTO,
  BUSINESS_TYPES,
  BusinessDTO,
  BusinessTypesDTO,
} from "@/app/_interfaces/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  loading: { isLoading: boolean; page: ActivityType };
  businessTypes: BusinessDTO["businessTypes"];
  placeholders: string[];
  selectedBusinessType: BusinessTypesDTO;
  appModal: AppModalDTO;
};

const initialState: InitialState = {
  loading: { isLoading: false, page: "default" },
  businessTypes: BUSINESS_TYPES,
  placeholders: [
    "What type of sharwarma?",
    "What's the name of the meal?",
    "What medicine or pharmaceiticals?",
  ],
  selectedBusinessType: BUSINESS_TYPES[0],
  appModal: { isOpen: false, type: undefined, props: {} },
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
    openModal(state, { payload }: PayloadAction<AppModalDTO>) {
      state.appModal = payload;
    },
  },
});

export const { changeSelectedBusinessType, setLoading, openModal } =
  AppSlice.actions;

export const getAppData = (state: { app: InitialState }) => state.app;

const AppSliceReducer = AppSlice.reducer;
export default AppSliceReducer;
