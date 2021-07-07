import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullPrice: 0,
  selectedBun: {},
  selectedItems: [],
  selectedItemsCount: {},
  currentIngredient: {},
};

const itemsSlice = createSlice({
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

      state.selectedItems.push({ ...action.payload, randomId: Math.random().toString(36).substring(2, 15) });
    },
    setCurrentIngredient: (state, action) => {
      state.currentIngredient = action.payload;
    },
    calculateFullPrice: (state) => {
      const selectedBun = state.selectedBun?.price || 0;
      
      state.fullPrice =
        state.selectedItems.reduce((acc, item) => acc + item.price, 0) +
        selectedBun * 2;
    },
    deleteIngredient: (state, action) => {
      state.selectedItems = [...state.selectedItems].filter(
        (_, index) => index !== action.payload.index
      );
      state.selectedItemsCount = {
        ...state.selectedItemsCount,
        [action.payload.name]:
          state.selectedItemsCount[action.payload.name] - 1,
      };
    },
    deleteAllIngredients: (state) => {
      state.selectedItems = [];
      state.selectedItemsCount = {};
    },
    handleItemMove: (state, action) => {
      const dragItem = state.selectedItems[action.payload.dragIndex];

      if (dragItem) {
        const newSelectedItemsArr = [...state.selectedItems];

        const prevItem = newSelectedItemsArr.splice(
          action.payload.hoverIndex,
          1,
          dragItem
        );

        newSelectedItemsArr.splice(action.payload.dragIndex, 1, prevItem[0]);

        state.selectedItems = newSelectedItemsArr;
      }
    },
  },
});

export const {
  handleBunSelection,
  handleItemAddition,
  setCurrentIngredient,
  calculateFullPrice,
  deleteIngredient,
  deleteAllIngredients,
  handleItemMove,
} = itemsSlice.actions;
export default itemsSlice.reducer;
