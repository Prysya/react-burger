import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL, LOAD_STATUSES, MESSAGES } from "../../constants";

const initialState = {
  isIngredientDetailsModalIsOpen: false,
  isOrderDetailsModalIsOpen: false,
  isOrderButtonDisabled: false,

  orderNumber: null,
  orderNumberLoading: LOAD_STATUSES.idle,
  orderNumberError: null,
};

const handleOpenOrderDetailsModal = createAsyncThunk(
  "modalWindows/handleOpenOrderDetailsModal",
  async ({ selectedItems, selectedBun }, { getState }) => {
    const { orderNumberLoading } = getState().modalWindows;

    if (orderNumberLoading !== LOAD_STATUSES.pending) return;

    try {
      const selectedIngredientsId = selectedItems.map(({ _id }) => _id);
      const body = {
        ingredients: [selectedBun._id, ...selectedIngredientsId],
      };

      const res = await fetch(API_URL.CREATE_ORDER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error(res.message);

      const {
        order: { number },
      } = await res.json();

      if (number && typeof number === "number") {
        return number;
      }

      throw new Error(MESSAGES.errors.orderNumberIsUndefined);
    } catch (err) {
      console.error(err);
      return err;
    }
  }
);

const modalWindowsReducer = createSlice({
  name: "modalWindows",
  initialState,
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
  },
  extraReducers: {
    [handleOpenOrderDetailsModal.pending]: (state) => {
      if (state.orderNumberLoading === LOAD_STATUSES.idle) {
        state.orderNumberLoading = LOAD_STATUSES.pending;
        state.isOrderButtonDisabled = true;
        state.orderNumber = null;
        state.orderNumberError = null;
      }
    },
    [handleOpenOrderDetailsModal.fulfilled]: (state, action) => {
      if (state.orderNumberLoading === LOAD_STATUSES.pending) {
        state.dataLoading = LOAD_STATUSES.idle;
        state.orderNumber = action.payload;
        state.isOrderButtonDisabled = false;
        state.isOrderDetailsModalIsOpen = true;
      }
    },
    [handleOpenOrderDetailsModal.rejected]: (state, action) => {
      if (state.orderNumberLoading === LOAD_STATUSES.pending) {
        state.dataLoading = LOAD_STATUSES.idle;
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
} = modalWindowsReducer.actions;
export default modalWindowsReducer.reducer;
