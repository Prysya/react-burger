import { createSlice } from "@reduxjs/toolkit";

import { LOAD_STATUSES } from "../../../constants";
import { handleOpenOrderDetailsModal } from "./handleOpenOrderDetailsModal";

export const initialModalsState = {
  isIngredientDetailsModalIsOpen: false,
  
  isFeedInfoModalIsOpen: false,
  
  isOrderDetailsModalIsOpen: false,
  isOrderButtonDisabled: false,

  orderNumber: null,
  orderNumberLoading: LOAD_STATUSES.IDLE,
  orderNumberError: null,
  orderNumberWaitAuth: false,
};

const modalWindowsSlice = createSlice({
  name: "modalWindows",
  initialState: initialModalsState,
  reducers: {
    handleOpenIngredientDetailsModal: (state) => {
      state.isIngredientDetailsModalIsOpen = true;
    },
    handleCloseIngredientDetailsModal: (state) => {
      state.isIngredientDetailsModalIsOpen = false;
    },
    handleCloseOrderDetailsModal: (state) => {
      state.isOrderDetailsModalIsOpen = false;
    },
    handleWaitingOrderNumber: (state) => {
      state.orderNumberWaitAuth = true;
    },
    handleOpenFeedInfoModal: (state) => {
      state.isFeedInfoModalIsOpen = true;
    },
    handleCloseFeedInfoModal: (state) => {
      state.isFeedInfoModalIsOpen = false;
    }
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
  handleOpenFeedInfoModal,
  handleCloseFeedInfoModal
} = modalWindowsSlice.actions;
export default modalWindowsSlice.reducer;
