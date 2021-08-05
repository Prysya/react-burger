import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitialItemsState } from "./interfaces";
import { Ingredient } from "../../../interfaces";

export const initialItemsState: IInitialItemsState = {
  fullPrice: 0,
  selectedBun: null,
  selectedItems: [],
  selectedItemsCount: null,
  currentIngredient: null,
};

const itemsSlice = createSlice({
  name: "items",
  initialState: initialItemsState,
  reducers: {
    handleBunSelection: (
      state: IInitialItemsState,
      action: PayloadAction<Ingredient>
    ) => {
      state.selectedBun = action.payload;
    },

    handleItemAddition: (
      state: IInitialItemsState,
      action: PayloadAction<Ingredient>
    ) => {
      state.selectedItemsCount = {
        ...state.selectedItemsCount,
        [action.payload.name]:
          (state.selectedItemsCount?.[action.payload.name] || 0) + 1,
      };

      state.selectedItems.push(action.payload);
    },
    setCurrentIngredient: (
      state: IInitialItemsState,
      action: PayloadAction<Ingredient>
    ) => {
      state.currentIngredient = action.payload;
    },
    calculateFullPrice: (state: IInitialItemsState) => {
      let selectedBun: number = 0;

      if (state.selectedBun && "price" in state.selectedBun) {
        selectedBun = state.selectedBun?.price;
      }

      state.fullPrice =
        state.selectedItems.reduce((acc, item) => acc + item.price, 0) +
        selectedBun * 2;
    },
    deleteIngredient: (
      state: IInitialItemsState,
      action: PayloadAction<{ index: number; name: string }>
    ) => {
      state.selectedItems = [...state.selectedItems].filter(
        (_, index) => index !== action.payload.index
      );

      if (
        state.selectedItemsCount &&
        state.selectedItemsCount[action.payload.name]
      ) {
        state.selectedItemsCount = {
          ...state.selectedItemsCount,
          [action.payload.name]:
            state.selectedItemsCount[action.payload.name] - 1,
        };
      }
    },
    deleteAllIngredients: (state: IInitialItemsState) => {
      state.selectedItems = [];
      state.selectedItemsCount = null;
      state.selectedBun = null;
    },
    handleItemMove: (
      state: IInitialItemsState,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) => {
      if (action.payload?.dragIndex) {
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
