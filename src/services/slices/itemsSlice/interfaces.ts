import {Ingredient} from "../../../interfaces";

export interface IInitialItemsState {
  fullPrice: number;
  selectedBun: Ingredient | null;
  selectedItems: Ingredient[];
  selectedItemsCount: { [key: string]: number } | null;
  currentIngredient: Ingredient | null;
}
