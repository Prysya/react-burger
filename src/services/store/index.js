import { configureStore } from "@reduxjs/toolkit";
import {
  authSlice,
  dataSlice,
  formSlice,
  itemsSlice,
  modalWindowsSlice,
} from "../slices";

export const store = configureStore({
  reducer: {
    data: dataSlice,
    items: itemsSlice,
    modalWindows: modalWindowsSlice,
    form: formSlice,
    auth: authSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});
