import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "../_features/User/userSlice";
import cartSliceReducer from "../_features/Cart/cartSlice";
import ActivitySliceReducer from "../_features/App/ActivitySlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSliceReducer,
      cart: cartSliceReducer,
      activity: ActivitySliceReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
