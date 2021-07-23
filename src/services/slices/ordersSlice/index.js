import { createSlice } from "@reduxjs/toolkit";
import { socketMiddleware } from "./socketMiddleware";

const initialState = {
  orders: [],
  currentUserOrders: [],
  selectedOrder: {},

  total: 0,
  totalToday: 0,

  wsError: null,
  wsClose: null,
  wsConnected: false,
  wsAuthConnected: false,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    handleOrderSelection: (state, action) => {
      state.selectedOrder = action.payload;
    },

    wsConnectionStart: () => {},
    wsSendMessage: () => {},
    wsConnectionSuccess: (state) => {
      state.wsError = null;
      state.wsClose = null;
      state.wsConnected = true;
    },
    wsConnectionError: (state, action) => {
      state.wsConnected = false;
      state.wsError = action.payload;
    },
    wsConnectionClosed: (state, action) => {
      state.wsConnected = false;
      state.wsClose = action.payload;
    },
    wsGetMessage: (state, action) => {
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
    wsAuthConnectionError: (state, action) => {
      state.wsAuthConnected = false;
      state.wsError = action.payload;
    },
    wsAuthConnectionClosed: (state, action) => {
      state.wsAuthConnected = false;
      state.wsClose = action.payload;
    },
    wsAuthGetMessage: (state, action) => {
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
  wsAuthSendMessage
} = ordersSlice.actions;

export const wsActions = {
  wsInit: wsConnectionStart,
  wsSendMessage: wsSendMessage,
  onOpen: wsConnectionSuccess,
  onClose: wsConnectionClosed,
  onError: wsConnectionError,
  onMessage: wsGetMessage,
};

export const wsAuthActions = {
  wsInit: wsAuthConnectionStart,
  wsSendMessage: wsAuthSendMessage,
  onOpen: wsAuthConnectionSuccess,
  onClose: wsAuthConnectionClosed,
  onError: wsAuthConnectionError,
  onMessage: wsAuthGetMessage,
};

export default ordersSlice.reducer;
