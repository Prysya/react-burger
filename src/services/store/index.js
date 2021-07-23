import { configureStore } from "@reduxjs/toolkit";
import {
  authSlice,
  dataSlice,
  formSlice,
  itemsSlice,
  modalWindowsSlice,
  ordersSlice,
  socketMiddleware,
  wsActions,
  wsAuthActions,
} from "../slices";

import { API_URL } from "../../constants";

const wsMiddlewares = [
  socketMiddleware(API_URL.WS_ALL_ORDERS, wsActions),
  socketMiddleware(API_URL.WS_USER_ORDERS, wsAuthActions, true),
];

export const store = configureStore({
  reducer: {
    data: dataSlice,
    items: itemsSlice,
    modalWindows: modalWindowsSlice,
    form: formSlice,
    auth: authSlice,
    orders: ordersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(wsMiddlewares),
  devTools: process.env.NODE_ENV !== "production",
});
