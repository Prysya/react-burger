import { configureStore } from "@reduxjs/toolkit";
import { dataReducer, itemsReducer, modalWindowsReducer } from "../reducers";

const store = configureStore({
  reducer: {
    data: dataReducer,
    items: itemsReducer,
    modalWindows: modalWindowsReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
