import { createSlice } from "@reduxjs/toolkit";

import { LOAD_STATUSES } from "../../../constants";
import { handleOpenOrderDetailsModal } from "./handleOpenOrderDetailsModal";

const initialState = {
  isIngredientDetailsModalIsOpen: false,
  isOrderDetailsModalIsOpen: false,
  isOrderButtonDisabled: false,

  orderNumber: null,
  orderNumberLoading: LOAD_STATUSES.IDLE,
  orderNumberError: null,
  orderNumberWaitAuth: false,

  isRedirectedFromMain: false,
};

const modalWindowsSlice = createSlice({
  name: "modalWindows",
  initialState,
  reducers: {
    handleOpenIngredientDetailsModal: (state) => {
      state.isRedirectedFromMain = true;
      state.isIngredientDetailsModalIsOpen = true;
    },
    handleCloseIngredientDetailsModal: (state) => {
      state.isRedirectedFromMain = false;
      state.isIngredientDetailsModalIsOpen = false;
    },
    handleCloseOrderDetailsModal: (state) => {
      state.isOrderDetailsModalIsOpen = false;
    },
    handleWaitingOrderNumber: (state) => {
      state.orderNumberWaitAuth = true;
    },
  },
  extraReducers: {
    [handleOpenOrderDetailsModal.pending]: (state) => {
      if (state.orderNumberLoading === LOAD_STATUSES.IDLE) {
        state.orderNumberLoading = LOAD_STATUSES.PENDING;
        state.isOrderButtonDisabled = true;
        state.orderNumber = null;
        state.orderNumberError = null;
        state.orderNumberWaitAuth = true;
      }
    },
    [handleOpenOrderDetailsModal.fulfilled]: (state, action) => {
      if (state.orderNumberLoading === LOAD_STATUSES.PENDING) {
        state.orderNumberLoading = LOAD_STATUSES.IDLE;
        state.orderNumber = action.payload;
        state.isOrderButtonDisabled = false;
        state.isOrderDetailsModalIsOpen = true;
        state.orderNumberWaitAuth = false;
      }
    },
    [handleOpenOrderDetailsModal.rejected]: (state, action) => {
      if (state.orderNumberLoading === LOAD_STATUSES.PENDING) {
        state.orderNumberLoading = LOAD_STATUSES.IDLE;
        state.orderNumberError = action.error;
        state.isOrderButtonDisabled = false;
        state.orderNumberWaitAuth = false;
      }
    },
  },
});

export { handleOpenOrderDetailsModal };
export const {
  handleOpenIngredientDetailsModal,
  handleCloseIngredientDetailsModal,
  handleCloseOrderDetailsModal,
  handleWaitingOrderNumber,
} = modalWindowsSlice.actions;
export default modalWindowsSlice.reducer;
