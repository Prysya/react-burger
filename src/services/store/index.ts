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
import { ApiUrl } from "../../enums";

const wsMiddlewares = [
  socketMiddleware(ApiUrl.WsAllOrders, wsActions),
  socketMiddleware(ApiUrl.WsUserOrders, wsAuthActions, true),
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
