import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LoadStatuses } from "../../../enums";
import { getDataFromApi } from "./getDataFromApi";
import { IInitialDataState } from "./interfaces";
import { Ingredient } from "../../../interfaces";

export const initialDataState: IInitialDataState = {
  data: [],
  dataObjectVariant: null,
  dataLoading: LoadStatuses.Idle,
  dataError: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState: initialDataState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDataFromApi.pending, (state: IInitialDataState) => {
      if (state.dataLoading === LoadStatuses.Idle) {
        state.dataLoading = LoadStatuses.Pending;
        state.dataError = null;
      }
    });

    builder.addCase(
      getDataFromApi.fulfilled,
      (state: IInitialDataState, action: PayloadAction<Ingredient[]>) => {
        if (state.dataLoading === LoadStatuses.Pending) {
          state.dataLoading = LoadStatuses.Idle;
          if (Array.isArray(action.payload) && action.payload.length > 0) {
            state.dataObjectVariant = action.payload.reduce(
              (obj, item) => ({
                ...obj,
                [item._id]: {
                  image: item.image_mobile,
                  price: item.type === "bun" ? item.price * 2 : item.price,
                  name: item.name,
                  type: item.type,
                },
              }),
              {}
            );
            state.data = action.payload;
          }
        }
      }
    );
    builder.addCase(
      getDataFromApi.rejected,
      (state: IInitialDataState, action) => {
        if (state.dataLoading === LoadStatuses.Pending) {
          state.dataLoading = LoadStatuses.Idle;
          state.dataError = action.error;
          state.data = [];
          state.dataObjectVariant = null;
        }
      }
    );
  },
});

export { getDataFromApi };
export default dataSlice.reducer;
