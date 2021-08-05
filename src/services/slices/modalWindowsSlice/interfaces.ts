import { SerializedError } from "@reduxjs/toolkit";
import { LoadStatuses } from "../../../enums";

export interface IInitialModalWindowsState {
  isIngredientDetailsModalIsOpen: boolean;

  isFeedInfoModalIsOpen: boolean;

  isOrderDetailsModalIsOpen: boolean;
  isOrderButtonDisabled: boolean;

  orderNumber: number | null;
  orderNumberLoading: LoadStatuses.Idle | LoadStatuses.Pending;
  orderNumberError: string | SerializedError | null;
  orderNumberWaitAuth: boolean;
}
