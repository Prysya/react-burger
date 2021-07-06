import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "./api/fetchData";
import { API_URL } from "../../../constants";

export const getDataFromApi = createAsyncThunk(
  "data/getDataFromApi",
  fetchData(API_URL.INGREDIENTS)
);
