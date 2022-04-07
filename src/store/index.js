import { configureStore } from "@reduxjs/toolkit";
import mrcongReducer from "./slices/mrcongSlice";
export const store = configureStore({
  reducer: {
    mrcongReducer,
  },
});
