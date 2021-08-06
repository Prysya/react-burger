import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { socketMiddleware } from "./socketMiddleware";
import {
  ICloseReason,
  ICurrentOrder,
  IInitialOrderState,
  IWsActions,
  IWsMessage,
} from "./interfaces";

export const initialOrdersState: IInitialOrderState = {
  orders: [],
  currentUserOrders: [],
  selectedOrder: null,

  total: 0,
  totalToday: 0,

  wsError: null,
  wsClose: null,
  wsConnected: false,
  wsAuthConnected: false,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState: initialOrdersState,
  reducers: {
    handleOrderSelection: (state, action: PayloadAction<ICurrentOrder>) => {
      if (
        action.payload === Object(action.payload) &&
        !Array.isArray(action.payload)
      ) {
        state.selectedOrder = action.payload;
      }
    },

    wsConnectionStart: () => {},
    wsSendMessage: () => {},
    wsConnectionSuccess: (state) => {
      state.wsError = null;
      state.wsClose = null;
      state.wsConnected = true;
    },
    wsConnectionError: (state, action: PayloadAction<string>) => {
      state.wsConnected = false;
      state.wsError = action.payload;
    },
    wsConnectionClosed: (state, action: PayloadAction<ICloseReason>) => {
      state.wsConnected = false;
      state.wsClose = action.payload;
    },
    wsGetMessage: (state, action: PayloadAction<IWsMessage>) => {
      if (action.payload?.orders && Array.isArray(action.payload.orders)) {
        state.orders = action.payload?.orders;
      }

      state.total =
        typeof action.payload?.total === "number" ? action.payload.total : 0;

      state.totalToday =
        typeof action.payload?.totalToday === "number"
          ? action.payload.totalToday
          : 0;
    },

    wsAuthConnectionStart: () => {},
    wsAuthSendMessage: () => {},
    wsAuthConnectionSuccess: (state) => {
      state.wsError = null;
      state.wsClose = null;
      state.wsAuthConnected = true;
    },
    wsAuthConnectionError: (state, action: PayloadAction<string>) => {
      state.wsAuthConnected = false;
      state.wsError = action.payload;
    },
    wsAuthConnectionClosed: (state, action: PayloadAction<ICloseReason>) => {
      state.wsAuthConnected = false;
      state.wsClose = action.payload;
    },
    wsAuthGetMessage: (state, action: PayloadAction<IWsMessage>) => {
      if (Array.isArray(action.payload?.orders)) {
        state.currentUserOrders = action.payload.orders;
      }
    },
  },
});

export { socketMiddleware };
export const {
  wsConnectionStart,
  wsConnectionSuccess,
  wsConnectionClosed,
  wsConnectionError,
  wsGetMessage,
  wsSendMessage,
  handleOrderSelection,
  wsAuthGetMessage,
  wsAuthConnectionClosed,
  wsAuthConnectionError,
  wsAuthConnectionSuccess,
  wsAuthConnectionStart,
  wsAuthSendMessage,
} = ordersSlice.actions;

export const wsActions: IWsActions = {
  wsInit: wsConnectionStart,
  wsSendMessage: wsSendMessage,
  onOpen: wsConnectionSuccess,
  onClose: wsConnectionClosed,
  onError: wsConnectionError,
  onMessage: wsGetMessage,
};

export const wsAuthActions: IWsActions = {
  wsInit: wsAuthConnectionStart,
  wsSendMessage: wsAuthSendMessage,
  onOpen: wsAuthConnectionSuccess,
  onClose: wsAuthConnectionClosed,
  onError: wsAuthConnectionError,
  onMessage: wsAuthGetMessage,
};

export default ordersSlice.reducer;
