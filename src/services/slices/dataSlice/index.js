import { createSlice } from "@reduxjs/toolkit";

import { LOAD_STATUSES } from "../../../constants";
import { getDataFromApi } from "./getDataFromApi";

const initialState = {
  data: [],
  dataLoading: LOAD_STATUSES.IDLE,
  dataError: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
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
        state.data = action.payload;
      }
    },
    [getDataFromApi.rejected]: (state, action) => {
      if (state.dataLoading === LOAD_STATUSES.PENDING) {
        state.dataLoading = LOAD_STATUSES.IDLE;
        state.dataError = action.error;
        state.data = [];
      }
    },
  },
});

export { getDataFromApi };
export default dataSlice.reducer;
