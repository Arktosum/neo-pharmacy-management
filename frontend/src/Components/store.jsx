import { configureStore } from "@reduxjs/toolkit";
import stockReducer from "./features/counter/stockSlice";

export const store = configureStore({
  reducer: {
    stock : stockReducer,
  },
});
