import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "./api/fetchData";
import { IInitialDataState } from "./interfaces";
import { ApiUrl, LoadStatuses } from "../../../enums";
import { Ingredient } from "../../../interfaces";

export const getDataFromApi = createAsyncThunk<
  Ingredient[] | never,
  void,
  {
    state: {
      data: IInitialDataState;
    };
  }
>("data/getDataFromApi", async (_, { getState }) => {
  const { dataLoading, data } = getState().data;

  if (data.length > 0) return data;

  if (dataLoading !== LoadStatuses.Pending) return;

  try {
    return (await fetchData(ApiUrl.Ingredients));
  } catch (err) {
    throw err;
  }
});
