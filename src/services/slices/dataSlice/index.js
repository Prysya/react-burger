import { createSlice } from "@reduxjs/toolkit";

import { LOAD_STATUSES } from "../../../constants";
import { getDataFromApi } from "./getDataFromApi";

export const initialDataState = {
  data: [],
  dataObjectVariant: {},
  dataLoading: LOAD_STATUSES.IDLE,
  dataError: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState: initialDataState,
  extraReducers: {
    [getDataFromApi.pending]: (state) => {
      if (state.dataLoading === LOAD_STATUSES.IDLE) {
        state.dataLoading = LOAD_STATUSES.PENDING;
        state.dataError = null;
      }
    },
    [getDataFromApi.fulfilled]: (state, action) => {
      if (state.dataLoading === LOAD_STATUSES.PENDING) {
        state.dataLoading = LOAD_STATUSES.IDLE;
        if (Array.isArray(action.payload) && action.payload.length > 0) {
          state.dataObjectVariant = action.payload.reduce(
            (obj, item) => ({
              ...obj,
              [item._id]: {
                image: item.image_mobile,
                price: item.type === "bun" ? item.price * 2 : item.price,
                name: item.name,
                type: item.type
              },
            }),
            {}
          );
          state.data = action.payload;
        }
      }
    },
    [getDataFromApi.rejected]: (state, action) => {
      if (state.dataLoading === LOAD_STATUSES.PENDING) {
        state.dataLoading = LOAD_STATUSES.IDLE;
        state.dataError = action.error;
        state.data = [];
        state.dataObjectVariant = {};
      }
    },
  },
});

export { getDataFromApi };
export default dataSlice.reducer;
