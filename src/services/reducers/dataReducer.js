import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL, LOAD_STATUSES, MESSAGES } from "../../constants";

const initialState = {
  data: [],
  dataLoading: LOAD_STATUSES.idle,
  dataError: null,
};

const getDataFromApi = createAsyncThunk(
  "data/getDataFromApi",
  async (_, { getState }) => {
    const { dataLoading } = getState().data;

    if (dataLoading !== LOAD_STATUSES.pending) return;

    try {
      const res = await fetch(API_URL.INGREDIENTS);

      if (!res.ok) throw new Error(res.message);

      const { data } = await res.json();

      if (data && Array.isArray(data)) {
        return await data;
      }

      throw new Error(MESSAGES.errors.dataIsUndefined);
    } catch (err) {
      console.error(err);
      return err;
    }
  }
);

const dataReducer = createSlice({
  name: "data",
  initialState,
  extraReducers: {
    [getDataFromApi.pending]: (state) => {
      if (state.dataLoading === LOAD_STATUSES.idle) {
        state.dataLoading = LOAD_STATUSES.pending;
      }
    },
    [getDataFromApi.fulfilled]: (state, action) => {
      if (state.dataLoading === LOAD_STATUSES.pending) {
        state.dataLoading = LOAD_STATUSES.idle;
        state.data = action.payload;
      }
    },
    [getDataFromApi.rejected]: (state, action) => {
      if (state.dataLoading === LOAD_STATUSES.pending) {
        state.dataLoading = LOAD_STATUSES.idle;
        state.dataError = action.error;
      }
    },
  },
});

export { getDataFromApi };
export default dataReducer.reducer;
