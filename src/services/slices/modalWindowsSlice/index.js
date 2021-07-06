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
  
  isRedirectedFromMain: false
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
  },
  extraReducers: {
    [handleOpenOrderDetailsModal.pending]: (state) => {
      if (state.orderNumberLoading === LOAD_STATUSES.IDLE) {
        state.orderNumberLoading = LOAD_STATUSES.PENDING;
        state.isOrderButtonDisabled = true;
        state.orderNumber = null;
        state.orderNumberError = null;
      }
    },
    [handleOpenOrderDetailsModal.fulfilled]: (state, action) => {
      if (state.orderNumberLoading === LOAD_STATUSES.PENDING) {
        state.orderNumberLoading = LOAD_STATUSES.IDLE;
        state.orderNumber = action.payload;
        state.isOrderButtonDisabled = false;
        state.isOrderDetailsModalIsOpen = true;
      }
    },
    [handleOpenOrderDetailsModal.rejected]: (state, action) => {
      if (state.orderNumberLoading === LOAD_STATUSES.PENDING) {
        state.orderNumberLoading = LOAD_STATUSES.IDLE;
        state.dataError = action.error;
        state.isOrderButtonDisabled = false;
      }
    },
  },
});

export { handleOpenOrderDetailsModal };
export const {
  handleOpenIngredientDetailsModal,
  handleCloseIngredientDetailsModal,
  handleCloseOrderDetailsModal,
} = modalWindowsSlice.actions;
export default modalWindowsSlice.reducer;
