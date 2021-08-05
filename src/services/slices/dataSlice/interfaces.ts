import { SerializedError } from "@reduxjs/toolkit";
import { LoadStatuses } from "../../../enums";
import { IDataObject, Ingredient } from "../../../interfaces";

export interface IInitialDataState {
  data: Ingredient[];
  dataObjectVariant: IDataObject | null;
  dataLoading: LoadStatuses.Idle | LoadStatuses.Pending;
  dataError: string | SerializedError | null;
}
