import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullPrice: 0,
  selectedBun: {},
  selectedItems: [],
  selectedItemsCount: {},
  currentIngredient: {},
};

const itemsReducer = createSlice({
  name: "items",
  initialState,
  reducers: {
    handleBunSelection: (state, action) => {
      state.selectedBun = action.payload;
    },

    handleItemAddition: (state, action) => {
      state.selectedItemsCount = {
        ...state.selectedItemsCount,
        [action.payload.name]:
          (state.selectedItemsCount[action.payload.name] || 0) + 1,
      };

      state.selectedItems.push(action.payload);
    },
    setCurrentIngredient: (state, action) => {
      state.currentIngredient = action.payload;
    },
    calculateFullPrice: (state) => {
      state.fullPrice =
        state.selectedItems.reduce((acc, item) => acc + item.price, 0) +
        state.selectedBun.price * 2;
    },
    deleteIngredient: (state, action) => {
      state.selectedItems = [...state.selectedItems].filter(
        (_, index) => index !== action.payload
      );
    },
    deleteAllIngredientsAndBun: state => {
      state.selectedItems = [];
      state.selectedBun = {};
      state.selectedItemsCount = {};
    }
  },
});

export const {
  handleBunSelection,
  handleItemAddition,
  setCurrentIngredient,
  calculateFullPrice,
  deleteIngredient,
  deleteAllIngredientsAndBun
} = itemsReducer.actions;
export default itemsReducer.reducer;
