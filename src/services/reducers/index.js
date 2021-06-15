import dataReducer, { getDataFromApi } from "./dataReducer";
import itemsReducer, {
  handleBunSelection,
  handleItemAddition,
  setCurrentIngredient,
  calculateFullPrice,
  deleteIngredient,
  deleteAllIngredientsAndBun,
  handleItemMove
} from "./itemsReducer";
import modalWindowsReducer, {
  handleOpenIngredientDetailsModal,
  handleCloseIngredientDetailsModal,
  handleOpenOrderDetailsModal,
  handleCloseOrderDetailsModal
} from "./modalWindowsReducer";

export {
  dataReducer,
  getDataFromApi,

  itemsReducer,
  handleBunSelection,
  handleItemAddition,
  setCurrentIngredient,
  calculateFullPrice,
  deleteIngredient,
  deleteAllIngredientsAndBun,
  handleItemMove,

  modalWindowsReducer,
  handleOpenIngredientDetailsModal,
  handleCloseIngredientDetailsModal,
  handleOpenOrderDetailsModal,
  handleCloseOrderDetailsModal
};
