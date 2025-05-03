import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./BasketSlice";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
  devTools:true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;