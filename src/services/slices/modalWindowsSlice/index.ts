import { createSlice } from "@reduxjs/toolkit";
import { handleOpenOrderDetailsModal } from "./handleOpenOrderDetailsModal";
import { IInitialModalWindowsState } from "./interfaces";
import { LoadStatuses } from "../../../enums";

export const initialModalsState: IInitialModalWindowsState = {
  isIngredientDetailsModalIsOpen: false,

  isFeedInfoModalIsOpen: false,

  isOrderDetailsModalIsOpen: false,
  isOrderButtonDisabled: false,

  orderNumber: null,
  orderNumberLoading: LoadStatuses.Idle,
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
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      handleOpenOrderDetailsModal.pending,
      (state) => {
        if (state.orderNumberLoading === LoadStatuses.Idle) {
          state.orderNumberLoading = LoadStatuses.Pending;
          state.isOrderButtonDisabled = true;
          state.orderNumber = null;
          state.orderNumberError = null;
          state.orderNumberWaitAuth = true;
        }
      }
    );

    builder.addCase(
      handleOpenOrderDetailsModal.fulfilled,
      (state, action) => {
        if (state.orderNumberLoading === LoadStatuses.Pending) {
          state.orderNumberLoading = LoadStatuses.Idle;
          state.orderNumber = action.payload;
          state.isOrderButtonDisabled = false;
          state.isOrderDetailsModalIsOpen = true;
          state.orderNumberWaitAuth = false;
        }
      }
    );

    builder.addCase(
      handleOpenOrderDetailsModal.rejected,
      (state, action) => {
        if (state.orderNumberLoading === LoadStatuses.Pending) {
          state.orderNumberLoading = LoadStatuses.Idle;
          state.orderNumberError = action.error;
          state.isOrderButtonDisabled = false;
          state.orderNumberWaitAuth = false;
        }
      }
    );
  },
});

export { handleOpenOrderDetailsModal };
export const {
  handleOpenIngredientDetailsModal,
  handleCloseIngredientDetailsModal,
  handleCloseOrderDetailsModal,
  handleWaitingOrderNumber,
  handleOpenFeedInfoModal,
  handleCloseFeedInfoModal,
} = modalWindowsSlice.actions;
export default modalWindowsSlice.reducer;
